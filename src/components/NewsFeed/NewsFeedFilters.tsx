import { ControlledSelect } from 'components/common/fields/Select';
import { ControlledTextField } from 'components/common/fields/TextField';
import { ChangeEventHandler, FC, KeyboardEvent, useCallback, useId, useMemo } from 'react';
import { debounce, SelectChangeEvent } from '@mui/material';
import { API_OPTIONS, INITIAL_PAGE, SEARCH_PARAM_KEYS } from 'api';
import { ControlledDatePicker } from 'components/common/fields/DatePicker';
import dayjs from 'dayjs';
import { SubmitHandler, useFormContext, useWatch } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiSlug } from 'api/types';
import { SortByOptions } from 'types';
import FiltersFabs from 'components/NewsFeed/FiltersFabs';
import { createPortal } from 'react-dom';
import { NewsFeedFiltersStyledForm } from './NewsFeed.styled';
import { FormFields } from './NewsFeedFormProvider';

const DEBOUNCE_TIME = 3000;
const REACT_ROOT_DOM_NODE = document.getElementById('root')!;

type NewsFeedFiltersProps = {
  disableFilters: boolean;
  sortByOptions: SortByOptions;
};

const NewsFeedFilters: FC<NewsFeedFiltersProps> = ({ disableFilters, sortByOptions }) => {
  const filtersFormId = useId();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [fromDate, toDate] = useWatch<FormFields>({
    name: [SEARCH_PARAM_KEYS.from, SEARCH_PARAM_KEYS.to],
  });
  const { handleSubmit, reset } = useFormContext<FormFields>();
  const fromDateMaxDate = toDate ? dayjs(toDate) : undefined;
  const shouldHideFromDateTodayBtn = fromDateMaxDate
    ? fromDateMaxDate.diff(dayjs(), 'day') < 0
    : false;

  const handleSourceChange = (event: SelectChangeEvent<unknown>) => {
    const apiSlug = event.target.value as ApiSlug;
    navigate({ pathname: `../${apiSlug}` }, { state: { from: { search } } });
  };

  const handleSearchChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =
    useCallback(
      (event) => {
        const searchParams = new URLSearchParams(search);
        const newSearchValue = event.target.value.trim();

        if (newSearchValue) {
          searchParams.set(SEARCH_PARAM_KEYS.query, newSearchValue);
        } else {
          searchParams.delete(SEARCH_PARAM_KEYS.query);
        }
        searchParams.set(SEARCH_PARAM_KEYS.page, INITIAL_PAGE);
        navigate({ search: searchParams.toString() });
      },
      [navigate, search],
    );
  const debouncedHandleSearchChange = useMemo(
    () => debounce(handleSearchChange, DEBOUNCE_TIME),
    [handleSearchChange],
  );

  const handleSearchBlur: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    const searchParams = new URLSearchParams(search);
    const newSearchValue = event.target.value.trim();
    const oldSearchValue = searchParams.get(SEARCH_PARAM_KEYS.query) ?? '';

    if (newSearchValue === oldSearchValue) return;

    handleSearchChange(event);
    debouncedHandleSearchChange.clear();
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
    }
  };

  const onSubmit: SubmitHandler<FormFields> = ({ from, to, sortBy }) => {
    const neededData = { from, to, sortBy };
    const currentSearchParams = new URLSearchParams(search);

    Object.entries(neededData).forEach(([key, value]) => {
      if (key && value) {
        currentSearchParams.set(key, value);
      } else if (!value) {
        currentSearchParams.delete(key);
      }
    });

    navigate({ search: currentSearchParams.toString() });
  };

  return (
    <NewsFeedFiltersStyledForm
      id={filtersFormId}
      noValidate
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
    >
      <ControlledSelect
        name="source"
        label="Source"
        disabled={disableFilters}
        options={API_OPTIONS}
        onChange={handleSourceChange}
      />
      <ControlledTextField
        name="query"
        label="Search"
        disabled={disableFilters}
        inputProps={{ maxLength: 96 }}
        onBlur={handleSearchBlur}
        onChange={debouncedHandleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />
      <ControlledDatePicker
        name={SEARCH_PARAM_KEYS.from}
        label="From Date"
        disabled={disableFilters}
        maxDate={fromDateMaxDate}
        disableFuture
        hideTodayBtn={shouldHideFromDateTodayBtn}
      />
      <ControlledDatePicker
        name={SEARCH_PARAM_KEYS.to}
        label="To Date"
        disabled={disableFilters}
        minDate={dayjs(fromDate)}
        disableFuture
      />
      <ControlledSelect
        name={SEARCH_PARAM_KEYS.sortBy}
        label="Sort By"
        disabled={disableFilters}
        options={sortByOptions}
      />
      {createPortal(<FiltersFabs filtersFormId={filtersFormId} />, REACT_ROOT_DOM_NODE)}
    </NewsFeedFiltersStyledForm>
  );
};

export default NewsFeedFilters;
