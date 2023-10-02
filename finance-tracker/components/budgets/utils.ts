import { monthStartDates, weekStartDays } from "@/lib/constants";
import { floorDate, toTitleCase } from "@/lib/utils";
import { Duration, OverallBudget } from "@prisma/client";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  format,
  isToday,
  startOfMonth,
  startOfWeek,
  subSeconds,
} from "date-fns";

export function getDateRange(dateObj: Date) {
  const month = format(dateObj, "MMMM");
  const day = format(dateObj, "d");

  const nextYear = addYears(new Date(), 1);

  const fromDate = new Date(`${month} ${day}, ${new Date().getFullYear()}`);
  const toDate = new Date(`${month} ${day}, ${nextYear.getFullYear()}`);

  return {
    from: floorDate(addDays(fromDate, 1)),
    to: subSeconds(addDays(floorDate(toDate), 1), 1),
  };
}

export function getTransactionDateRange(budget: OverallBudget) {
  switch (budget.duration) {
    case "WEEKLY":
      const { from, to } = getWeekDateRange(budget.weekStartDay!);

      return { from, to };
    case "MONTHLY":
      const today = new Date();
      const todayDayOfMonth = today.getDate();
      const startDate = budget.monthStartDate!;

      const firstDayOfThisMonth = startOfMonth(today);
      const firstDayOfNextMonth = endOfMonth(today);

      const firstDayOfLastMonth = addMonths(firstDayOfThisMonth, -1);

      if (todayDayOfMonth >= startDate) {
        return {
          from: addDays(firstDayOfThisMonth, startDate),
          to: firstDayOfNextMonth,
        };
      } else {
        return {
          from: floorDate(addDays(firstDayOfLastMonth, startDate)),
          to: subSeconds(floorDate(addDays(firstDayOfThisMonth, startDate)), 1),
        };
      }

    case "YEARLY":
      return getDateRange(budget.yearStartDate!);
    default:
      return {
        from: floorDate(new Date()),
        to: subSeconds(floorDate(addDays(new Date(), 1)), 1),
      };
  }
}

interface GetStartDateProps {
  duration: Duration;
  weekStartDay: any;
  monthStartDate: any;
  yearStartDate: any;
}

export function getStartDate({
  duration,
  weekStartDay,
  monthStartDate,
  yearStartDate,
}: GetStartDateProps) {
  switch (duration) {
    case "WEEKLY":
      return `Every ${toTitleCase(weekStartDay)}`;
    case "MONTHLY":
      const val = monthStartDates.find(
        (date) => date.value === monthStartDate.toString(),
      );
      return val?.label;
    case "YEARLY":
      return `Every ${format(yearStartDate, "MMMM do")}`;
    default:
      return "Everyday";
  }
}

export function getWeekDateRange(weekStartDay: string) {
  // week start day can be monday tuesday whatever
  const today = new Date();
  const startDay = weekStartDays.find((day) => day.label === weekStartDay)!;

  const startOfThisWeek = floorDate(startOfWeek(today, { weekStartsOn: 1 }));
  const startDayOfThisWeek = floorDate(
    addDays(startOfThisWeek, startDay.value),
  );
  const endOfThisWeek = subSeconds(addWeeks(startDayOfThisWeek, 1), 1);

  if (startDayOfThisWeek > startOfThisWeek) {
    if (isToday(startDayOfThisWeek)) {
      const from = startDayOfThisWeek;
      const to = subSeconds(addWeeks(from, 1), 1);

      return { from, to };
    } else {
      const from = addWeeks(startDayOfThisWeek, -1);
      const to = subSeconds(startDayOfThisWeek, 1);
      return { from, to };
    }
  } else {
    const from = startDayOfThisWeek;
    const to = endOfThisWeek;

    return { from, to };
  }

  // const today = new Date().getDay();
  // const startDay = weekStartDays.find(
  //   (day) => day.label === weekStartDay,
  // )!.value;

  // if (startDay < today) {
  //   const from = subWeeks(
  //     startOfWeek(new Date(), { weekStartsOn: startDay }),
  //     1,
  //   );
  //   const to = endOfWeek(from, { weekStartsOn: startDay });
  //   return { from, to };
  // } else {
  //   const from = floorDate(
  //     addDays(startOfWeek(new Date(), { weekStartsOn: startDay }), 1),
  //   );
  //   const to = subSeconds(
  //     addDays(floorDate(endOfWeek(from, { weekStartsOn: startDay })), 1),
  //     1,
  //   );
  //   console.log("else: ", from, to);

  //   return { from, to };
  // }
}
