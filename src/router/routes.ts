import { GUARDIAN_API_SLUG, NEWS_API_SLUG, NY_TIMES_API_SLUG } from 'api';

const ROUTES = {
  root: {
    path: '/',
    slug: 'root',
  },
  newsFeed: {
    path: '/news-feed',
    slug: 'news-feed',
  },
  any: { path: '*', slug: 'any-path' },
} as const;

const SOURCE_ROUTES = {
  theGuardian: {
    path: GUARDIAN_API_SLUG,
    slug: GUARDIAN_API_SLUG,
  },
  theNewYorkTimes: {
    path: NY_TIMES_API_SLUG,
    slug: NY_TIMES_API_SLUG,
  },
  newApi: {
    path: NEWS_API_SLUG,
    slug: NEWS_API_SLUG,
  },
} as const;

const ROUTE_PARAMS = {
  source: {
    param: ':source',
    slug: 'source',
  },
} as const;

export { ROUTES, ROUTE_PARAMS, SOURCE_ROUTES };
