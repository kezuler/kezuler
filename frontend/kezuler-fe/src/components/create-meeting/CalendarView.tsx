import React from 'react';
import DatePicker from 'react-datepicker';
import { addMonths } from 'date-fns';
import { ko } from 'date-fns/esm/locale';

import { setMindate } from 'src/utils/dateParser';

import 'src/styles/DatePicker.scss';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  highlightDates: Date[];
}

function CalendarView({ startDate, setStartDate, highlightDates }: Props) {
  return (
    <div className="date-picker-wrapper">
      <DatePicker
        locale={ko}
        selected={startDate}
        onChange={setStartDate}
        // renderCustomHeader
        highlightDates={highlightDates}
        minDate={setMindate()}
        maxDate={addMonths(new Date(), 6)}
        showDisabledMonthNavigation
        inline
      />
    </div>
  );
}

export default CalendarView;
