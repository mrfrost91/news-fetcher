import { CommonArticle } from 'types';
import { SEARCH_PARAM_KEYS } from './baseNewsApi.constants';
import {
  NewYorkTimesApiArticle,
  NewYorkTimesApiErrorResponse,
  NewYorkTimesApiSuccessResponse,
} from './newYorkTimes.types';
import { BaseNewsApi } from './baseNewsApi';
import {
  BASE_IMG_URL,
  BASE_URL,
  IMMUTABLE_SEARCH_PARAMS,
  INITIAL_SEARCH_PARAMS,
  NY_TIMES_API_SLUG,
  NY_TIMES_ROWS_RER_PAGE_OPTIONS,
  SEARCH_PARAMS_MAP,
} from './newYorkTimesApi.constants';

class NewYorkTimesApi extends BaseNewsApi<NewYorkTimesApiSuccessResponse> {
  constructor() {
    const essentialSearchParams = new URLSearchParams(IMMUTABLE_SEARCH_PARAMS);
    const initialSearchParamsString = new URLSearchParams(INITIAL_SEARCH_PARAMS).toString();

    super(
      NY_TIMES_API_SLUG,
      BASE_URL,
      essentialSearchParams,
      initialSearchParamsString,
      undefined,
      NY_TIMES_ROWS_RER_PAGE_OPTIONS,
    );
  }

  get transformedSearchParams(): string {
    const transformedSearchParams = new URLSearchParams(this.searchParamsString);
    const currentPage =
      transformedSearchParams.get(SEARCH_PARAM_KEYS.page) ?? INITIAL_SEARCH_PARAMS.page;
    transformedSearchParams.set(SEARCH_PARAM_KEYS.page, `${Number(currentPage) - 1}`);

    SEARCH_PARAMS_MAP.forEach(([oldKey, newKey]) => {
      const searchParamValue = transformedSearchParams.get(oldKey);

      if (newKey && searchParamValue) {
        transformedSearchParams.set(newKey, searchParamValue);
      }
      transformedSearchParams.delete(oldKey);
    });

    return transformedSearchParams.toString();
  }

  get articles(): NewYorkTimesApiArticle[] {
    if (!this.fetchedData) return [];

    return this.fetchedData.response.docs;
  }

  getCommonFormatArticle(articleIndex: number): CommonArticle {
    const article = this.articles[articleIndex];
    const urlToImage = article.multimedia[0]?.url ?? null;
    const fullUrlToImage = urlToImage && `${BASE_IMG_URL}${urlToImage}`;

    return {
      url: article.web_url,
      urlToImage: fullUrlToImage,
      description: article.lead_paragraph,
      publishedAt: article.pub_date,
      title: article.headline.main,
    };
  }

  get currentPage(): number {
    if (!this.fetchedData) return 1;

    return Math.floor(this.fetchedData.response.meta.offset / this.rowsPerPageOptions[0]) + 1;
  }

  get currentPageSize(): number {
    return this.rowsPerPageOptions[0];
  }

  get totalResults(): number | null {
    if (!this.fetchedData) return null;

    return this.fetchedData.response.meta.hits;
  }

  async fetchNews(search: string, signal: AbortSignal): Promise<NewYorkTimesApiSuccessResponse> {
    this.searchParamsString = search;
    const response = await fetch(this.constructFullUrl(), { signal });

    if (!response.ok) {
      const errorData = (await response.json()) as NewYorkTimesApiErrorResponse;

      if ('errors' in errorData) {
        throw new Error(errorData.errors[0]);
      }

      if ('fault' in errorData) {
        throw new Error(errorData.fault.faultstring);
      }
      throw new Error('Something went wrong');
    }

    const parsedResponse = (await response.json()) as NewYorkTimesApiSuccessResponse;
    this.fetchedData = parsedResponse;

    return parsedResponse;
  }
}

export default NewYorkTimesApi;
