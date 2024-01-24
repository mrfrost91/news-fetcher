import { CommonArticle, SortByOptions } from 'types';
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

class NewsApi extends BaseNewsApi {
  private readonly newsApiInitialSearchParams = INITIAL_SEARCH_PARAMS;

  private currentPageValue = Number(this.newsApiInitialSearchParams.page);

  private currentPageSizeValue = Number(this.newsApiInitialSearchParams.pageSize);

  private readonly newsApiSortByOptions = SORT_BY_OPTIONS;

  private fetchedData: undefined | NewsApiSuccessResponse;

  constructor() {
    const immutableSearchParams = new URLSearchParams(IMMUTABLE_SEARCH_PARAMS);

    super(NEWS_API_SLUG, BASE_URL, immutableSearchParams);
  }

  get currentSortByOptions(): SortByOptions {
    return this.newsApiSortByOptions;
  }

  get articles(): NewsApiArticle[] {
    if (!this.fetchedData) return [];

    return this.fetchedData.articles;
  }

  getCommonFormatArticle(articleIndex: number): CommonArticle {
    const description = this.articles[articleIndex].description ?? '';
    const filteredDescription =
      description && description.replace(/<\w+>/g, '').replace(/<\/\w+>/g, '');

    return {
      url: this.articles[articleIndex].url,
      urlToImage: this.articles[articleIndex].urlToImage,
      description: filteredDescription,
      publishedAt: this.articles[articleIndex].publishedAt,
      title: this.articles[articleIndex].title,
    };
  }

  get currentPage(): number {
    if (!this.fetchedData) return 1;

    return this.currentPageValue;
  }

  set currentPage(value: number) {
    this.currentPageValue = value;
  }

  get currentPageSize(): number {
    if (!this.fetchedData) return 1;

    return this.currentPageSizeValue;
  }

  set currentPageSize(value: number) {
    this.currentPageSizeValue = value;
  }

  get initialSearchParamsString(): string {
    return new URLSearchParams(this.newsApiInitialSearchParams).toString();
  }

  get totalResults(): number {
    if (!this.fetchedData) return 0;

    return this.fetchedData.totalResults;
  }

  async fetchNews(search: string): Promise<NewsApiSuccessResponse> {
    this.currentSearchParamsString = search;
    const response = await fetch(this.constructFullUrl());

    if (!response.ok) {
      const errorData = (await response.json()) as NewsApiErrorResponse;
      throw new Error(errorData.message);
    }

    this.fetchedData = (await response.json()) as NewsApiSuccessResponse;
    const currentSearchParams = new URLSearchParams(search);
    const currentPageFromSearchParams =
      currentSearchParams.get(SEARCH_PARAM_KEYS.page) ?? `${this.currentPageValue}`;
    const currentPageSizeFromSearchParams =
      currentSearchParams.get(SEARCH_PARAM_KEYS.pageSize) ?? `${this.currentPageSizeValue}`;
    this.currentPage = Number(currentPageFromSearchParams);
    this.currentPageSize = Number(currentPageSizeFromSearchParams);

    return this.fetchedData;
  }
}

export default NewsApi;
