import { ApiSlug, ApiTypes } from 'api/types';
import { GUARDIAN_API_SLUG } from 'api/guardianApi.constants';
import { GuardianApi, NEWS_API_SLUG, NewsApi, NewYorkTimesApi, NY_TIMES_API_SLUG } from 'api';

class ApiFactory {
  public static createApi(type?: ApiSlug, searchParams?: string): ApiTypes {
    if (type === GUARDIAN_API_SLUG) {
      return new GuardianApi(searchParams);
    }

    if (type === NY_TIMES_API_SLUG) {
      return new NewYorkTimesApi(searchParams);
    }

    if (type === NEWS_API_SLUG) {
      return new NewsApi(searchParams);
    }

    throw new Error('This API creator is not implemented');
  }
}

export default ApiFactory;
