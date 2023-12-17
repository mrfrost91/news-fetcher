import { ControlledSelect } from 'components/common/fields/Select';
import { ControlledTextField } from 'components/common/fields/TextField';
import { ChangeEventHandler, FC, KeyboardEvent } from 'react';
import { debounce, SelectChangeEvent } from '@mui/material';
import { API_OPTIONS, SEARCH_PARAM_KEYS } from 'api';
import { ControlledDatePicker } from 'components/common/fields/DatePicker';
import dayjs from 'dayjs';
import { useWatch } from 'react-hook-form';
import { NewsFeedFiltersStyledForm } from './NewsFeed.styled';
import { FormFields } from './NewsFeedFormProvider';

const DEBOUNCE_TIME = 3000;

type NewsFeedFiltersProps = {
  disableFilters: boolean;
  handleFromDateChange: (value: string | null) => void;
  handleToDateChange: (value: string | null) => void;
  handleSourceChange: <T>(event: SelectChangeEvent<T>) => void;
  handleSearchChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  sortByOptions: Readonly<{ label: string; value: string }[]>;
  handleSortByChange: <T>(event: SelectChangeEvent<T>) => void;
};

const NewsFeedFilters: FC<NewsFeedFiltersProps> = ({
  disableFilters,
  sortByOptions,
  handleFromDateChange,
  handleToDateChange,
  handleSourceChange,
  handleSearchChange,
  handleSortByChange,
}) => {
  const [fromDate, toDate] = useWatch<FormFields>({
    name: [SEARCH_PARAM_KEYS.from, SEARCH_PARAM_KEYS.to],
  });
  const fromDateMaxDate = toDate ? dayjs(toDate) : undefined;
  const shouldHideFromDateTodayBtn = fromDateMaxDate
    ? fromDateMaxDate.diff(dayjs(), 'day') < 0
    : false;
  const debouncedHandleSearchChange = debounce(handleSearchChange, DEBOUNCE_TIME);

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
    }
  };

  return (
    <NewsFeedFiltersStyledForm noValidate>
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
        onBlur={handleSearchChange}
        onChange={debouncedHandleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />
      <ControlledDatePicker
        name={SEARCH_PARAM_KEYS.from}
        label="From Date"
        disabled={disableFilters}
        maxDate={fromDateMaxDate}
        onAccept={handleFromDateChange}
        disableFuture
        hideTodayBtn={shouldHideFromDateTodayBtn}
      />
      <ControlledDatePicker
        name={SEARCH_PARAM_KEYS.to}
        label="To Date"
        disabled={disableFilters}
        minDate={dayjs(fromDate)}
        onAccept={handleToDateChange}
        disableFuture
      />
      <ControlledSelect
        name={SEARCH_PARAM_KEYS.sortBy}
        label="Sort By"
        disabled={disableFilters}
        options={sortByOptions}
        onChange={handleSortByChange}
      />
    </NewsFeedFiltersStyledForm>
  );
};

export default NewsFeedFilters;
