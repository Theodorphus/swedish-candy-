import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account', '/cart', '/api/', '/login', '/reset-password', '/forgot-password'],
      },
    ],
    sitemap: 'https://swedensweet.com/sitemap.xml',
  }
}
