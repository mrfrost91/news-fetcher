import { useForm, FormProvider } from 'react-hook-form';
import { FCWithChildren } from 'types';
import { FC, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ApiSlug, ApiSlugParam } from 'api/types';
import { SEARCH_PARAM_KEYS } from 'api';
import { ROUTE_PARAMS } from 'router';

export const QUERY_FORM_FIELD_KEY = 'query';

export type FormFields = {
  source?: ApiSlug;
  query: string;
  from: string | null;
  to: string | null;
  sortBy: string;
};

const NewsFeedFormProvider: FC<FCWithChildren> = ({ children }) => {
  const { [ROUTE_PARAMS.source.slug]: source } = useParams<ApiSlugParam>();
  const { search } = useLocation();

  const {
    [QUERY_FORM_FIELD_KEY]: query,
    from,
    to,
    sortBy,
  } = useMemo(() => {
    const searchParams = new URLSearchParams(search);

    return {
      [QUERY_FORM_FIELD_KEY]: searchParams.get(SEARCH_PARAM_KEYS.query) ?? '',
      from: searchParams.get(SEARCH_PARAM_KEYS.from) ?? null,
      to: searchParams.get(SEARCH_PARAM_KEYS.to) ?? null,
      sortBy: searchParams.get(SEARCH_PARAM_KEYS.sortBy) ?? '',
    };
  }, [search]);

  const methods = useForm<FormFields>({
    defaultValues: {
      source,
      query,
      from,
      to,
      sortBy,
    },
    values: { source, query, from, to, sortBy },
  });

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default NewsFeedFormProvider;
