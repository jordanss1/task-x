import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { useField } from "formik";
import { ReactElement, useState } from "react";

type CalenderPropTypes = {
  name: string;
};

const Calendar = ({ name }: CalenderPropTypes): ReactElement => {
  const [field, meta, helpers] = useField(name);

  const utcDate = field.value?.toISOString();


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        className="ps-6"
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: null,
        }}
        disablePast
        views={["month", "day", "hours", "minutes"]}
        label="Choose due date"
        {...field}
        onChange={(value) => {
          helpers.setValue(dayjs(value).toDate());
        }}
        value={field.value ? dayjs(field.value) : dayjs().add(1, "hour")}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
