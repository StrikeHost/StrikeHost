import dayjs from "dayjs";
import numeral from "numeral";

export const formatNumber = (value: number): string => {
  return numeral(value).format("0,0");
};

export const formatDate = (date: Date): string => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatTime = (date: Date): string => {
  return dayjs(date).format("HH:mm");
};
