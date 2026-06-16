import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'CCBot', 'Google-Extended'],
        disallow: ['/api/', '/private/'],
      }
    ],
    sitemap: 'https://www.evu.com/sitemap.xml',
  };
}
