import type { Decimal } from "@prisma/client/runtime/library";
import { CURRENCY } from "./constant";
import { type ValueType } from "recharts/types/component/DefaultTooltipContent";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
});

export const formatPrice = (price: Decimal | number | ValueType) =>
  formatter.format(Number(price));

export const formatPrettyDate = (date: Date | null) => {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);
};

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const formatPrettyTime = (date: Date | null) => {
  if (!date) return null;
  return dayjs(date).fromNow();
};

export const slugifyString = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
};
