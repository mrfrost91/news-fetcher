import { CommonArticle } from 'types';
import { SEARCH_PARAM_KEYS } from 'api/baseNewsApi.constants';
import { NewsApiArticle, NewsApiErrorResponse, NewsApiSuccessResponse } from './newsApi.types';
import { BaseNewsApi } from './baseNewsApi';
import {
  BASE_URL,
  IMMUTABLE_SEARCH_PARAMS,
  INITIAL_SEARCH_PARAMS,
  NEWS_API_SLUG,
  SORT_BY_OPTIONS,
} from './newsApi.constants';

class NewsApi extends BaseNewsApi<NewsApiSuccessResponse> {
  #currentPage = Number(INITIAL_SEARCH_PARAMS.page);

  #currentPageSize = Number(INITIAL_SEARCH_PARAMS.pageSize);

  constructor() {
    const essentialSearchParams = new URLSearchParams(IMMUTABLE_SEARCH_PARAMS);
    const initialSearchParamsString = new URLSearchParams(INITIAL_SEARCH_PARAMS).toString();

    super(
      NEWS_API_SLUG,
      BASE_URL,
      essentialSearchParams,
      initialSearchParamsString,
      SORT_BY_OPTIONS,
    );
  }

  get articles(): NewsApiArticle[] {
    if (!this.fetchedData) return [];

    return this.fetchedData.articles;
  }

  getCommonFormatArticle(articleIndex: number): CommonArticle {
    const article = this.articles[articleIndex];
    const description = article.description
      ? article.description.replace(/<\w+>/g, '').replace(/<\/\w+>/g, '')
      : '';

    return {
      url: article.url,
      urlToImage: article.urlToImage,
      description,
      publishedAt: article.publishedAt,
      title: article.title,
    };
  }

  get currentPage(): number {
    return this.#currentPage;
  }

  set currentPage(value: number) {
    this.#currentPage = value;
  }

  get currentPageSize(): number {
    return this.#currentPageSize;
  }

  set currentPageSize(value: number) {
    this.#currentPageSize = value;
  }

  get totalResults(): number | null {
    if (!this.fetchedData) return null;

    return this.fetchedData.totalResults;
  }

  async fetchNews(search: string, signal: AbortSignal): Promise<NewsApiSuccessResponse> {
    this.searchParamsString = search;
    const response = await fetch(this.constructFullUrl(), { signal });

    if (!response.ok) {
      const errorData = (await response.json()) as NewsApiErrorResponse;
      throw new Error(errorData.message);
    }

    const parsedResponse = (await response.json()) as NewsApiSuccessResponse;
    this.fetchedData = parsedResponse;
    const currentSearchParams = new URLSearchParams(search);
    const currentPageFromSearchParams =
      currentSearchParams.get(SEARCH_PARAM_KEYS.page) ?? `${this.#currentPage}`;
    const currentPageSizeFromSearchParams =
      currentSearchParams.get(SEARCH_PARAM_KEYS.pageSize) ?? `${this.#currentPageSize}`;
    this.currentPage = Number(currentPageFromSearchParams);
    this.currentPageSize = Number(currentPageSizeFromSearchParams);

    return parsedResponse;
  }
}

export default NewsApi;
