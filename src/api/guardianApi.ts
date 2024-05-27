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

class GuardianApi extends BaseNewsApi<GuardianApiSuccessResponse> {
  constructor() {
    const essentialSearchParams = new URLSearchParams(IMMUTABLE_SEARCH_PARAMS);

    super(GUARDIAN_API_SLUG, BASE_URL, essentialSearchParams);
  }

  get transformedSearchParams(): string {
    const transformedSearchParams = new URLSearchParams(this.searchParamsString);

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
    const article = this.articles[articleIndex];
    const description = article.fields.trailText
      ? article.fields.trailText.replace(/<\w+>/g, '').replace(/<\/\w+>/g, '')
      : '';

    return {
      url: article.webUrl,
      urlToImage: article.fields.thumbnail,
      description,
      publishedAt: article.webPublicationDate,
      title: article.webTitle,
    };
  }

  get currentPage(): number {
    if (!this.fetchedData) return 1;

    return this.fetchedData.response.currentPage;
  }

  get currentPageSize(): number {
    if (!this.fetchedData) return this.rowsPerPageOptions[0];

    return this.fetchedData.response.pageSize;
  }

  get totalResults(): number | null {
    if (!this.fetchedData) return null;

    return this.fetchedData.response.total;
  }

  async fetchNews(search: string, signal: AbortSignal): Promise<GuardianApiSuccessResponse> {
    this.searchParamsString = search;
    const response = await fetch(this.constructFullUrl(), { signal });

    if (!response.ok) {
      const errorData = (await response.json()) as GuardianApiErrorResponse;
      throw new Error(errorData.response.message);
    }

    const parsedResponse = (await response.json()) as GuardianApiSuccessResponse;
    this.fetchedData = parsedResponse;

    return parsedResponse;
  }
}

export default GuardianApi;
