import type { MetadataRoute } from 'next'
import { getAllProductHandles, getVendors } from '@/lib/shopify'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://swedensweet.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/catalog/usa`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/catalog/sweden`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/apply`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/refund-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/shipping-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]

  let productRoutes: MetadataRoute.Sitemap = []
  try {
    const handles = await getAllProductHandles()
    productRoutes = handles.map((handle) => ({
      url: `${base}/products/${handle}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {
    // Fail silently — sitemap still works without products
  }

  let brandRoutes: MetadataRoute.Sitemap = []
  try {
    const vendors = await getVendors()
    brandRoutes = [
      { url: `${base}/brands`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
      ...vendors.map((v) => ({
        url: `${base}/brands/${encodeURIComponent(v)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ]
  } catch {
    // Fail silently
  }

  return [...staticRoutes, ...productRoutes, ...brandRoutes]
}
