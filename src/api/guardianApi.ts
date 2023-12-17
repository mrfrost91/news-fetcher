import { CommonArticle } from 'types/globalTypes';
import {
  GuardianApiArticle,
  GuardianApiErrorResponse,
  GuardianApiSuccessResponse,
} from './guardianApi.types';
import {
  GUARDIAN_API_SLUG,
  BASE_URL,
  IMMUTABLE_SEARCH_PARAMS,
  SEARCH_PARAMS_MAP,
  SORT_BY_OPTIONS,
} from './guardianApi.constants';
import { BaseNewsApi } from './baseNewsApi';

class GuardianApi extends BaseNewsApi {
  private readonly apiSlug = GUARDIAN_API_SLUG;

  private readonly sortByOptions = SORT_BY_OPTIONS;

  private fetchedData: undefined | GuardianApiSuccessResponse;

  constructor(searchParams?: string) {
    const immutableSearchParams = new URLSearchParams(IMMUTABLE_SEARCH_PARAMS);

    super(BASE_URL, immutableSearchParams, searchParams);
  }

  get currentApiSlug() {
    return this.apiSlug;
  }

  get currentSortByOptions() {
    return this.sortByOptions;
  }

  get mappedSearchParams(): URLSearchParams {
    const transformedSearchParams = new URLSearchParams(this.stringifiedSearchParams);

    SEARCH_PARAMS_MAP.forEach(([oldKey, newKey]) => {
      const searchParamsValue = transformedSearchParams.get(oldKey);

      if (newKey && searchParamsValue) {
        transformedSearchParams.set(newKey, searchParamsValue);
      }
      transformedSearchParams.delete(oldKey);
    });

    return transformedSearchParams;
  }

  get articles(): GuardianApiArticle[] {
    if (!this.fetchedData) return [];

    return this.fetchedData.response.results;
  }

  getCommonFormatArticle(articleIndex: number): CommonArticle {
    return {
      url: this.articles[articleIndex].webUrl,
      urlToImage: this.articles[articleIndex].fields.thumbnail,
      description: this.articles[articleIndex].fields.trailText
        .replace(/<\w+>/g, '')
        .replace(/<\/\w+>/g, ''),
      publishedAt: this.articles[articleIndex].webPublicationDate,
      title: this.articles[articleIndex].webTitle,
    };
  }

  get totalResults(): number {
    if (!this.fetchedData) return 0;

    return this.fetchedData.response.total;
  }

  async fetchNews(): Promise<GuardianApiSuccessResponse> {
    const response = await fetch(this.stringifiedUrl);

    if (!response.ok) {
      const errorData = (await response.json()) as GuardianApiErrorResponse;
      throw new Error(errorData.response.message);
    }

    this.fetchedData = (await response.json()) as GuardianApiSuccessResponse;

    return this.fetchedData;
  }
}

export default GuardianApi;
