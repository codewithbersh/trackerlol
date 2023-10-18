import { WeekDayType } from "@/types/types";
import { Moon, Sun, SunMoon } from "lucide-react";

export const MONTH_START_DATES = [
  {
    value: "1",
    label: "Every 1st",
  },
  {
    value: "2",
    label: "Every 2nd",
  },
  {
    value: "3",
    label: "Every 3rd",
  },
  {
    value: "4",
    label: "Every 4th",
  },
  {
    value: "5",
    label: "Every 5th",
  },
  {
    value: "6",
    label: "Every 6th",
  },
  {
    value: "7",
    label: "Every 7th",
  },
  {
    value: "8",
    label: "Every 8th",
  },
  {
    value: "9",
    label: "Every 9th",
  },
  {
    value: "10",
    label: "Every 10th",
  },
  {
    value: "11",
    label: "Every 11th",
  },
  {
    value: "12",
    label: "Every 12th",
  },
  {
    value: "13",
    label: "Every 13th",
  },
  {
    value: "14",
    label: "Every 14th",
  },
  {
    value: "15",
    label: "Every 15th",
  },
  {
    value: "16",
    label: "Every 16th",
  },
  {
    value: "17",
    label: "Every 17th",
  },
  {
    value: "18",
    label: "Every 18th",
  },
  {
    value: "19",
    label: "Every 19th",
  },
  {
    value: "20",
    label: "Every 20th",
  },
  {
    value: "21",
    label: "Every 21st",
  },
  {
    value: "22",
    label: "Every 22nd",
  },
  {
    value: "23",
    label: "Every 23rd",
  },
  {
    value: "24",
    label: "Every 24th",
  },
  {
    value: "25",
    label: "Every 25th",
  },
  {
    value: "26",
    label: "Every 26th",
  },
  {
    value: "27",
    label: "Every 27th",
  },
  {
    value: "28",
    label: "Every 28th",
  },
];

export const WEEK_START_DAYS: WeekDayType[] = [
  {
    value: 0,
    label: "SUNDAY",
  },
  {
    value: 1,
    label: "MONDAY",
  },
  {
    value: 2,
    label: "TUESDAY",
  },
  {
    value: 3,
    label: "WEDNESDAY",
  },
  {
    value: 4,
    label: "THURSDAY",
  },
  {
    value: 5,
    label: "FRIDAY",
  },
  {
    value: 6,
    label: "SATURDAY",
  },
];

export const CHOICES_WEEK_START_DAY = [
  {
    value: "SUNDAY",
    label: "Every Sunday",
  },
  {
    value: "MONDAY",
    label: "Every Monday",
  },
  {
    value: "TUESDAY",
    label: "Every Tuesday",
  },
  {
    value: "WEDNESDAY",
    label: "Every Wednesday",
  },
  {
    value: "THURSDAY",
    label: "Every Thursday",
  },
  {
    value: "FRIDAY",
    label: "Every Friday",
  },
  {
    value: "SATURDAY",
    label: "Every Saturday",
  },
];

export const TRANSACTION_TYPES = [
  {
    label: "Expense",
    value: "expense",
  },
  {
    label: "Income",
    value: "income",
  },
];

export const TRANSACTION_DURATION = [
  {
    label: "Daily",
    value: "DAILY",
  },
  {
    label: "Weekly",
    value: "WEEKLY",
  },
  {
    label: "Monthly",
    value: "MONTHLY",
  },
  {
    label: "Yearly",
    value: "YEARLY",
  },
];

export const THEMES = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: SunMoon,
  },
];

export const THOUSAND_STYLES = [
  {
    label: "Default",
    value: "en-US",
    numericFormat: "thousand",
    placeholder: "123,456,789",
  },
  {
    label: "Lakh",
    value: "en-IN",
    numericFormat: "lakh",
    placeholder: "12,34,56,789",
  },
];

export const DISPLAY_CENTS = [
  {
    value: "true",
    label: "Display Cents",
    numericFormat: 2,
    placeholder: "10.99",
  },
  {
    value: "false",
    label: "Hide Cents",
    numericFormat: 0,
    placeholder: "11",
  },
];
