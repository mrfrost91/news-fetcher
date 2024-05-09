import { ApiSlug, ApiTypes } from './types';
import { GUARDIAN_API_SLUG } from './guardianApi.constants';
import GuardianApi from './guardianApi';
import { NEWS_API_SLUG } from './newsApi.constants';
import NewsApi from './newsApi';
import { NY_TIMES_API_SLUG } from './newYorkTimesApi.constants';
import NewYorkTimesApi from './newYorkTimesApi';

class ApiFactory {
  public static createApi(type?: ApiSlug): ApiTypes {
    if (type === GUARDIAN_API_SLUG) {
      return new GuardianApi();
    }

    if (type === NY_TIMES_API_SLUG) {
      return new NewYorkTimesApi();
    }

    if (type === NEWS_API_SLUG) {
      return new NewsApi();
    }

    throw new Error('This API creator is not implemented');
  }
}

export default ApiFactory;
