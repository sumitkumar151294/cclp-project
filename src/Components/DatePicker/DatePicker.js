import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerInput = ({ id, placeholderText, selectsRange, dateFormat, showTimeSelect, timeFormat, className, showDisabledMonthNavigation ,onChange}) => {
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();
    const onChangeHandler = (value) => {
        setDateStart(value[0]);
        setDateEnd(value[1]);
    }
    return (
        <DatePicker
            id={id}
            placeholderText={placeholderText}
            selectsRange={selectsRange}
            startDate={dateStart}
            endDate={dateEnd}
            onChange={onChange}
            dateFormat={dateFormat}
            showTimeSelect={showTimeSelect}
            timeFormat={timeFormat}
            className={className}
            showDisabledMonthNavigation={showDisabledMonthNavigation}
        />
    )
}

export default DatePickerInput