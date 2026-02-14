import type { MetadataRoute } from 'next';
import { SPEAKERS } from '@/speakers';
import { isFeatureEnabled } from '@/config/featureFlags';

export const dynamic = 'force-static';
export const revalidate = 60; // Revalidate every 60 seconds

// Define all static pages with their optional feature flag
export default function sitemap(): MetadataRoute.Sitemap {
  const allStaticPages = [
    {
      url: 'https://2026.pyconfhyd.org/',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: 'https://2026.pyconfhyd.org/code-of-conduct',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      featureFlag: 'COC_REPORTING_GUIDE',
    },
    {
      url: 'https://2026.pyconfhyd.org/schedule',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
      featureFlag: 'SCHEDULE',
    },
    {
      url: 'https://2026.pyconfhyd.org/travel',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      featureFlag: 'TRAVEL',
    },
    {
      url: 'https://2026.pyconfhyd.org/faq',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      featureFlag: 'FAQ',
    },
    {
      url: 'https://2026.pyconfhyd.org/reporting-guide',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      featureFlag: 'COC_REPORTING_GUIDE',
    },
    {
      url: 'https://2026.pyconfhyd.org/cfp-guidelines',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://2026.pyconfhyd.org/convince-my-boss',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: 'https://2026.pyconfhyd.org/job-board',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
      featureFlag: 'JOB_BOARD',
    },
    {
      url: 'https://2026.pyconfhyd.org/job-board-rules-guidelines',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
      featureFlag: 'JOB_BOARD',
    },
    {
      url: 'https://2026.pyconfhyd.org/our-team',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      featureFlag: 'OUR_TEAM',
    },
    {
      url: 'https://2026.pyconfhyd.org/tickets',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
      featureFlag: 'TICKETS',
    },
    {
      url: 'https://2026.pyconfhyd.org/welcome-guide',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      featureFlag: 'WELCOME_GUIDE',
    },
  ];

  const staticPages = allStaticPages
    .filter(
      (page) => !page.featureFlag || isFeatureEnabled(page.featureFlag)
    )
    .map(({ featureFlag, ...page }) => page);

  // sitemap for speaker pages
  const speakerPages = isFeatureEnabled('SPEAKERS_PAGE')
    ? SPEAKERS.map((speaker) => ({
      url: `https://2026.pyconfhyd.org/speakers/${speaker.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
    : [];

  return [...staticPages, ...speakerPages];
}
