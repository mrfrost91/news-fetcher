import { ApiSlug } from 'api/types';

interface ApiAuthInterface {
  apiSlug: ApiSlug;
  baseUrl: string;
  essentialSearchParams: URLSearchParams;
}

export class ApiAuth implements ApiAuthInterface {
  readonly #apiSlug: ApiSlug;

  readonly #baseUrl: string;

  readonly #essentialSearchParams: URLSearchParams;

  constructor(apiSlug: ApiSlug, baseUrl: string, essentialSearchParams: URLSearchParams) {
    this.#apiSlug = apiSlug;
    this.#baseUrl = baseUrl;
    this.#essentialSearchParams = essentialSearchParams;
  }

  get apiSlug() {
    return this.#apiSlug;
  }

  get baseUrl() {
    return this.#baseUrl;
  }

  get essentialSearchParams() {
    return this.#essentialSearchParams;
  }
}
