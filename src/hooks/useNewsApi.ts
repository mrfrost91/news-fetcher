import { useCallback, useRef, useState } from 'react';
import { ApiFactory, SEARCH_PARAM_KEYS } from 'api';
import { Location, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApiSlugParam, ApiInstance } from 'api/types';
import { ROUTE_PARAMS } from 'router';
import { useAbortController } from './index';

type LocationState = { from: { search: string } } | null;

const useNewsApi = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<number>(() => Date.now());
  const { [ROUTE_PARAMS.source.slug]: source } = useParams<ApiSlugParam>();
  const { search, state } = useLocation() as Location<LocationState>;
  const navigate = useNavigate();
  const api = useRef<ApiInstance>(ApiFactory.createApi(source));

  const handleEmptySearchParams = useCallback(
    (apiToUse: ApiInstance, locationState: LocationState) => {
      const mergedSearchParams = new URLSearchParams(apiToUse.searchParamsString);

      // Prefill search params with query, from and to dates if switching from other news sources
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

  const fetchNewsApi = useCallback(
    async (signal: AbortSignal) => {
      setLoading(true);

      const shouldCreateNewInstance = api.current.apiSlug !== source;
      const apiToUse = shouldCreateNewInstance ? ApiFactory.createApi(source) : api.current;

      if (!search) {
        handleEmptySearchParams(apiToUse, state);

        return;
      }

      try {
        await apiToUse.fetchNews(search, signal);
        setError(null);
      } catch (err: unknown) {
        setError(err as Error);
      } finally {
        if (shouldCreateNewInstance) api.current = apiToUse;
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [source, search, handleEmptySearchParams, state, trigger],
  );

  const retry = useCallback(() => {
    setTrigger(Date.now());
  }, []);

  useAbortController(fetchNewsApi);

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
      sortByOptions: api.current.sortByOptions,
    },
    error,
    loading,
    retry,
  };
};

export default useNewsApi;
