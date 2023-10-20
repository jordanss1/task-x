import dayjs, { Dayjs } from "dayjs";

export const taskStatus = (date?: Dayjs) => {
  let timeFormat;
  let taskIsOverdue;
  let notDue;

  if (!date) {
    notDue = true;
  }

  return { taskIsOverdue, timeFormat, notDue };
};
