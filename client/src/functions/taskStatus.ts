import dayjs, { Dayjs } from "dayjs";

export const taskStatus = (date?: Dayjs) => {
  let timeLeft;
  let timeFormat;
  let taskIsOverdue;
  let notDue;

  const months = date?.diff(dayjs(), "months");
  const weeks = date?.diff(dayjs(), "weeks");
  const days = date?.diff(dayjs(), "days");
  const hours = date?.diff(dayjs(), "hours");
  const minutes = date?.diff(dayjs(), "minutes");
  const seconds = date?.diff(dayjs(), "seconds");

  if (!date) {
    notDue = true;
  } else if (dayjs().isAfter(date) || dayjs().isSame(date)) {
    taskIsOverdue = true;
  } else if (dayjs().isBefore(date) && months) {
    taskIsOverdue = false;
    timeLeft = Math.round(months);
    timeFormat = months > 1 ? "months" : "month";
  } else if (dayjs().isBefore(date) && weeks) {
    taskIsOverdue = false;
    timeLeft = Math.round(weeks);
    timeFormat = weeks > 1 ? "weeks" : "week";
  } else if (dayjs().isBefore(date) && days) {
    taskIsOverdue = false;
    timeLeft = days;
    timeFormat = days > 1 ? "days" : "day";
  } else if (dayjs().isBefore(date) && hours) {
    taskIsOverdue = false;
    timeLeft = hours;
    timeFormat = hours > 1 ? "hours" : "hour";
  } else if (dayjs().isBefore(date) && minutes) {
    taskIsOverdue = false;
    timeLeft = minutes;
    timeFormat = minutes > 1 ? "minutes" : "minute";
  } else if (dayjs().isBefore(date) && seconds) {
    taskIsOverdue = false;
    timeLeft = seconds;
    timeFormat = seconds > 1 ? "seconds" : "second";
  }

  return { taskIsOverdue, timeLeft, timeFormat, notDue };
};
