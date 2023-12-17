import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiFactory } from 'api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApiSlugParam, ApiTypes } from 'api/types';
import { ROUTE_PARAMS } from 'router/routes';

const useNewsApis = () => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<string>(new Date().toISOString());
  const { [ROUTE_PARAMS.source.slug]: source } = useParams<ApiSlugParam>();
  const { search } = useLocation();
  const navigate = useNavigate();
  const shouldBlockConsecutiveCalls = useRef(false);
  const api = useRef<ApiTypes>(ApiFactory.createApi(source, search));

  const fetchNewsApi = useCallback(async () => {
    if (shouldBlockConsecutiveCalls.current) return;

    setLoading(true);

    const shouldCreateNewInstance =
      api.current.currentApiSlug !== source || search !== api.current.stringifiedSearchParams;
    const apiToUse = shouldCreateNewInstance ? ApiFactory.createApi(source, search) : api.current;

    if (!search) {
      shouldBlockConsecutiveCalls.current = true;
      navigate({ search: apiToUse.stringifiedSearchParams }, { replace: true });
    }

    try {
      await apiToUse.fetchNews();
      setError(null);
    } catch (err: unknown) {
      setError(err as Error);
      // alert(err);
    } finally {
      if (shouldCreateNewInstance) api.current = apiToUse;
      shouldBlockConsecutiveCalls.current = false;
      setLoading(false);
    }
  }, [source, search, navigate]);

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
    },
    apiMethods: {
      getCommonFormatArticle(idx: number) {
        return api.current.getCommonFormatArticle(idx);
      },
      getCurrentSearchParams() {
        return api.current.stringifiedSearchParams;
      },
      setCurrentPage(value: string) {
        api.current.setCurrentPage(value);
      },
      setCurrentPageSize(value: string) {
        api.current.setCurrentPageSize(value);
      },
      setCurrentSearch(value: string) {
        api.current.setCurrentSearch(value);
      },
      setCurrentFromDate(value: string | null) {
        api.current.setCurrentFromDate(value);
      },
      setCurrentToDate(value: string | null) {
        api.current.setCurrentToDate(value);
      },
      setCurrentSortBy(value: string) {
        api.current.setCurrentSortBy(value);
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
