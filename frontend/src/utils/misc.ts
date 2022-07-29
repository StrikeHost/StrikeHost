import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import numeral from "numeral";

dayjs.extend(relativeTime);

export const formatNumber = (value: number): string => {
  return numeral(value).format("0,0");
};

export const formatDate = (date: Date): string => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatDateDiff = (date: Date): string => {
  return dayjs().to(date);
};

export const formatTime = (date: Date): string => {
  return dayjs(date).format("HH:mm");
};
