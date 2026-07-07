import { MetadataRoute } from 'next';
import { holographicPages } from '@/lib/holographic-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.holograph.cc';
  const currentDate = new Date();

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tech`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const techPages: MetadataRoute.Sitemap = holographicPages.map((page) => ({
    url: `${baseUrl}/tech/${page.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...mainPages, ...techPages];
}
