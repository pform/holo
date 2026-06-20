import type { MetadataRoute } from 'next';
import { holographicPages } from '@/lib/holographic-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.holograph.cc';

  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    }
  ];

  const techPages = holographicPages.map((page) => ({
    url: `${baseUrl}/tech/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...mainPages, ...techPages];
}
