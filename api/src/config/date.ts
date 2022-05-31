import dayjs from "dayjs";

export const dateFormat = "YYYY-MM-DD";

export const formatDate = (date: Date) => dayjs(date).format(dateFormat);
export const validateDateFormat = (val: string | undefined) =>
  dayjs(val, dateFormat).isValid();
