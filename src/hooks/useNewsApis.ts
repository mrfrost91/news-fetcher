import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiFactory, SEARCH_PARAM_KEYS } from 'api';
import { Location, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApiSlugParam, ApiTypes } from 'api/types';
import { ROUTE_PARAMS } from 'router';

type LocationState = { from: { search: string } } | null;

const useNewsApis = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<string>(new Date().toISOString());
  const { [ROUTE_PARAMS.source.slug]: source } = useParams<ApiSlugParam>();
  const { search, state } = useLocation() as Location<LocationState>;
  const navigate = useNavigate();
  const api = useRef<ApiTypes>(ApiFactory.createApi(source));

  const handleEmptySearchParams = useCallback(
    (apiToUse: ApiTypes, locationState: LocationState) => {
      const mergedSearchParams = new URLSearchParams(apiToUse.initialSearchParamsString);

      // Prefill search params with query, from and to dates if switching from other news source
      if (locationState && locationState.from.search) {
        const fromStateSearchParams = new URLSearchParams(locationState.from.search);
        fromStateSearchParams.delete(SEARCH_PARAM_KEYS.page);
        fromStateSearchParams.delete(SEARCH_PARAM_KEYS.pageSize);
        fromStateSearchParams.delete(SEARCH_PARAM_KEYS.sortBy);

        fromStateSearchParams.forEach((value, key) => {
          mergedSearchParams.set(key, value);
        });
      }

      navigate({ search: mergedSearchParams.toString() }, { replace: true });
    },
    [navigate],
  );

  const fetchNewsApi = useCallback(async () => {
    setLoading(true);

    const shouldCreateNewInstance = api.current.currentApiSlug !== source;
    const apiToUse = shouldCreateNewInstance ? ApiFactory.createApi(source) : api.current;

    if (!search) {
      handleEmptySearchParams(apiToUse, state);

      return;
    }

    try {
      await apiToUse.fetchNews(search);
      setError(null);
    } catch (err: unknown) {
      setError(err as Error);
    } finally {
      if (shouldCreateNewInstance) api.current = apiToUse;
      setLoading(false);
    }
  }, [source, search, handleEmptySearchParams, state]);

  const retry = () => {
    setTrigger(new Date().toISOString());
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchNewsApi();
  }, [fetchNewsApi, trigger]);

  return {
    apiData: {
      articles: api.current.articles,
      totalResults: api.current.totalResults,
      currentPage: api.current.currentPage,
      currentPageSize: api.current.currentPageSize,
    },
    apiMethods: {
      getCommonFormatArticle(idx: number) {
        return api.current.getCommonFormatArticle(idx);
      },
    },
    apiOptions: {
      rowsPerPageOptions: api.current.rowsPerPageOptions,
      sortByOptions: api.current.currentSortByOptions,
    },
    error,
    loading,
    retry,
  };
};

export default useNewsApis;
