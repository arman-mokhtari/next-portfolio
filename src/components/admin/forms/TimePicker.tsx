/* eslint-disable camelcase */
"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/prime.css";
import { Input } from "@/components/ui/input";

const CouponTimePicker = ({ ...rest }: any) => {
  return (
    <DatePicker
      zIndex={10000}
      format="YYYY/MM/DD"
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      render={(value, openCalendar) => {
        return <Input value={value} onClick={openCalendar} {...rest} />;
      }}
    />
  );
};
export default CouponTimePicker;
