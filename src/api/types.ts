import { API_SLUGS, GuardianApi, NewsApi, NewYorkTimesApi } from 'api';

export type ApiInstance = NewsApi | GuardianApi | NewYorkTimesApi;
export type ApiSlug = (typeof API_SLUGS)[keyof typeof API_SLUGS];
export type ApiSlugParam = { source: ApiSlug };
