/* eslint-disable camelcase */
"use client";

import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/prime.css";
import { Input } from "@/components/ui/input";

const CustonTimePicker = ({ value, onChange, ...rest }: any) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (newValue: any):any => {
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <DatePicker
      zIndex={10000}
      format="YYYY/MM/DD"
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      value={selectedValue}
      onChange={handleChange}
      render={(value, openCalendar) => {
        return (
          <Input
            value={value}
            onClick={openCalendar}
            {...rest}
          />
        );
      }}
    />
  );
};

export default CustonTimePicker;
