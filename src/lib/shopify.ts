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
  availableForSale: boolean
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
  availableForSale
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

// ─── Customer auth types ───────────────────────────────────────────────────

export type ShopifyCustomer = {
  id: string
  firstName: string | null
  lastName: string | null
  email: string
  phone: string | null
  tags: string[]
  orders: {
    id: string
    orderNumber: number
    processedAt: string
    financialStatus: string
    fulfillmentStatus: string
    currentTotalPrice: { amount: string; currencyCode: string }
  }[]
}

// ─── Customer login ────────────────────────────────────────────────────────

export async function customerLogin(
  email: string,
  password: string
): Promise<{ accessToken: string; expiresAt: string } | { error: string }> {
  const { data, errors } = await shopify.request(`
    mutation CustomerLogin($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { code message }
      }
    }
  `, { variables: { input: { email, password } } })

  if (errors) return { error: 'Something went wrong. Please try again.' }

  const userErrors = data?.customerAccessTokenCreate?.customerUserErrors
  if (userErrors?.length > 0) {
    const code = userErrors[0].code
    if (code === 'UNIDENTIFIED_CUSTOMER') return { error: 'Incorrect email or password.' }
    return { error: userErrors[0].message }
  }

  const token = data?.customerAccessTokenCreate?.customerAccessToken
  if (!token) return { error: 'Could not create session. Please try again.' }

  return { accessToken: token.accessToken, expiresAt: token.expiresAt }
}

// ─── Get customer by token ─────────────────────────────────────────────────

export async function getCustomer(accessToken: string): Promise<ShopifyCustomer | null> {
  const { data, errors } = await shopify.request(`
    query Customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        tags
        orders(first: 10, sortKey: PROCESSED_AT, reverse: true) {
          nodes {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            currentTotalPrice { amount currencyCode }
          }
        }
      }
    }
  `, { variables: { customerAccessToken: accessToken } })

  if (errors || !data?.customer) return null

  const c = data.customer
  return {
    ...c,
    orders: c.orders.nodes,
  }
}

// ─── Customer logout ───────────────────────────────────────────────────────

export async function customerLogout(accessToken: string): Promise<void> {
  await shopify.request(`
    mutation CustomerLogout($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
      }
    }
  `, { variables: { customerAccessToken: accessToken } })
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

// ─── Cart types ────────────────────────────────────────────────────────────

export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: { amount: string; currencyCode: string }
    product: {
      id: string
      title: string
      handle: string
      featuredImage: { url: string; altText: string | null } | null
    }
  }
}

export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: { amount: string; currencyCode: string }
    totalAmount: { amount: string; currencyCode: string }
  }
  lines: CartLine[]
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          title
          price { amount currencyCode }
          product {
            id title handle
            featuredImage { url altText }
          }
        }
      }
    }
  }
`

function normalizeCart(cart: { lines: { nodes: CartLine[] } } & Omit<Cart, 'lines'>): Cart {
  return { ...cart, lines: cart.lines.nodes }
}

// ─── Cart API ──────────────────────────────────────────────────────────────

export async function cartCreate(
  lines: { merchandiseId: string; quantity: number }[] = []
): Promise<Cart | null> {
  const { data, errors } = await shopify.request(`
    mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FIELDS} }
      }
    }
  `, { variables: { lines } })

  if (errors || !data?.cartCreate?.cart) return null
  return normalizeCart(data.cartCreate.cart)
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const { data, errors } = await shopify.request(`
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FIELDS} }
    }
  `, { variables: { cartId } })

  if (errors || !data?.cart) return null
  return normalizeCart(data.cart)
}

export async function cartLinesAdd(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart | null> {
  const { data, errors } = await shopify.request(`
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
      }
    }
  `, { variables: { cartId, lines } })

  if (errors || !data?.cartLinesAdd?.cart) return null
  return normalizeCart(data.cartLinesAdd.cart)
}

export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart | null> {
  const { data, errors } = await shopify.request(`
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FIELDS} }
      }
    }
  `, { variables: { cartId, lines } })

  if (errors || !data?.cartLinesUpdate?.cart) return null
  return normalizeCart(data.cartLinesUpdate.cart)
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[]
): Promise<Cart | null> {
  const { data, errors } = await shopify.request(`
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FIELDS} }
      }
    }
  `, { variables: { cartId, lineIds } })

  if (errors || !data?.cartLinesRemove?.cart) return null
  return normalizeCart(data.cartLinesRemove.cart)
}
