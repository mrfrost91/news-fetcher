import { CommonArticle } from 'types';
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
} from './guardianApi.constants';
import { BaseNewsApi } from './baseNewsApi';

class GuardianApi extends BaseNewsApi {
  private fetchedData: undefined | GuardianApiSuccessResponse;

  constructor() {
    const immutableSearchParams = new URLSearchParams(IMMUTABLE_SEARCH_PARAMS);

    super(GUARDIAN_API_SLUG, BASE_URL, immutableSearchParams);
  }

  get transformedSearchParams(): string {
    const transformedSearchParams = new URLSearchParams(this.currentSearchParamsString);

    SEARCH_PARAMS_MAP.forEach(([oldKey, newKey]) => {
      const searchParamsValue = transformedSearchParams.get(oldKey);

      if (newKey && searchParamsValue) {
        transformedSearchParams.set(newKey, searchParamsValue);
      }
      transformedSearchParams.delete(oldKey);
    });

    return transformedSearchParams.toString();
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

  get currentPage(): number {
    if (!this.fetchedData) return 1;

    return this.fetchedData.response.currentPage;
  }

  get currentPageSize(): number {
    if (!this.fetchedData) return 1;

    return this.fetchedData.response.pageSize;
  }

  get totalResults(): number {
    if (!this.fetchedData) return 0;

    return this.fetchedData.response.total;
  }

  async fetchNews(search: string): Promise<GuardianApiSuccessResponse> {
    this.currentSearchParamsString = search;
    const response = await fetch(this.constructFullUrl());

    if (!response.ok) {
      const errorData = (await response.json()) as GuardianApiErrorResponse;
      throw new Error(errorData.response.message);
    }

    this.fetchedData = (await response.json()) as GuardianApiSuccessResponse;

    return this.fetchedData;
  }
}

export default GuardianApi;
