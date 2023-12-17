import { GUARDIAN_API_SLUG, NEWS_API_SLUG, NY_TIMES_API_SLUG } from 'api';

export const API_SLUGS = {
  [GUARDIAN_API_SLUG]: GUARDIAN_API_SLUG,
  [NY_TIMES_API_SLUG]: NY_TIMES_API_SLUG,
  [NEWS_API_SLUG]: NEWS_API_SLUG,
} as const;

export const API_OPTIONS = [
  {
    label: 'The Guardian',
    value: GUARDIAN_API_SLUG,
  },
  {
    label: 'The New York Times',
    value: NY_TIMES_API_SLUG,
  },
  {
    label: 'News API',
    value: NEWS_API_SLUG,
  },
] as const;
