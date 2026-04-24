import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export const shopify = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2026-04',
  privateAccessToken: process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN!,
})

export type ShopifyProduct = {
  id: string
  handle: string
  title: string
  productType: string
  tags: string[]
  featuredImage: { url: string; altText: string | null } | null
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
}

export type ShopifyProductDetail = ShopifyProduct & {
  vendor: string
  description: string
  descriptionHtml: string
  images: { url: string; altText: string | null }[]
  variants: {
    id: string
    title: string
    availableForSale: boolean
    price: { amount: string; currencyCode: string }
    selectedOptions: { name: string; value: string }[]
  }[]
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
    maxVariantPrice: { amount: string; currencyCode: string }
  }
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  productType
  tags
  featuredImage { url altText }
  priceRange { minVariantPrice { amount currencyCode } }
`

export async function getProducts(first = 6): Promise<ShopifyProduct[]> {
  const { data, errors } = await shopify.request(`
    query Products($first: Int!) {
      products(first: $first) {
        nodes { ${PRODUCT_FIELDS} }
      }
    }
  `, { variables: { first } })

  if (errors) return []
  return data?.products?.nodes ?? []
}

export async function getProductsByTag(tag: string, first = 50): Promise<ShopifyProduct[]> {
  const { data, errors } = await shopify.request(`
    query ProductsByTag($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        nodes { ${PRODUCT_FIELDS} }
      }
    }
  `, { variables: { query: `tag:${tag}`, first } })

  if (errors) return []
  return data?.products?.nodes ?? []
}

export async function getProductByHandle(handle: string): Promise<ShopifyProductDetail | null> {
  const { data, errors } = await shopify.request(`
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        vendor
        productType
        tags
        description
        descriptionHtml
        featuredImage { url altText }
        images(first: 10) { nodes { url altText } }
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        variants(first: 20) {
          nodes {
            id
            title
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
    }
  `, { variables: { handle } })

  if (errors || !data?.product) return null

  const p = data.product
  return {
    ...p,
    images: p.images.nodes,
    variants: p.variants.nodes,
  }
}

export async function getAllProductHandles(): Promise<string[]> {
  const { data, errors } = await shopify.request(`
    query AllHandles {
      products(first: 250) {
        nodes { handle }
      }
    }
  `)

  if (errors) return []
  return data?.products?.nodes?.map((p: { handle: string }) => p.handle) ?? []
}

export async function getCollections() {
  const { data, errors } = await shopify.request(`
    query Collections {
      collections(first: 12) {
        nodes {
          id
          title
          productsCount { count }
        }
      }
    }
  `)

  if (errors) return []
  return data?.collections?.nodes ?? []
}
