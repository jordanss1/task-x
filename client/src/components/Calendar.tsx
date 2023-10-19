import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs, { Dayjs } from "dayjs";
import { ReactElement, useState } from "react";

const Calendar = ({
  setDate,
}: {
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}): ReactElement => {
  const [value, setValue] = useState<Dayjs | null>(dayjs().add(1, "hour"));

  const utcDate = value?.toISOString();
  const localeDate = dayjs(utcDate).toDate();


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        className="ps-6"
        value={value}
        onAccept={(value) => setDate(value)}
        onChange={(value) => setValue(value)}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: null,
        }}
        disablePast
        views={["month", "day", "hours", "minutes"]}
        label="Choose due date"
      />
    </LocalizationProvider>
  );
};

export default Calendar;
