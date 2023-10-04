import { monthStartDates, weekStartDays } from "@/lib/constants";
import { floorDate, toTitleCase } from "@/lib/utils";
import { Duration, OverallBudget } from "@prisma/client";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfDay,
  endOfWeek,
  format,
  isToday,
  isYesterday,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subSeconds,
} from "date-fns";
import { CategoryBudgetWithLimitAsNumber } from "@/types/types";

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
  const today = new Date();
  const startDay = weekStartDays.find((day) => day.label === weekStartDay)!;

  const startOfThisWeek = floorDate(startOfWeek(today, { weekStartsOn: 1 }));
  const startDayOfThisWeek = floorDate(
    addDays(startOfThisWeek, startDay.value),
  );
  const endOfThisWeek = subSeconds(addWeeks(startDayOfThisWeek, 1), 1);

  if (startDayOfThisWeek > startOfThisWeek) {
    if (isToday(startDayOfThisWeek) || isYesterday(startDayOfThisWeek)) {
      const from = startDayOfThisWeek;
      const to = addDays(subSeconds(addWeeks(from, 1), 1), -1);
      console.log("here");
      return { from, to };
    } else {
      console.log("there");
      const from = addWeeks(startDayOfThisWeek, -1);
      const to = subSeconds(startDayOfThisWeek, 1);
      return { from, to };
    }
  } else {
    console.log("where");
    const from = startDayOfThisWeek;
    const to = endOfThisWeek;

    return { from, to };
  }
}

export function getBudgetDateRange({
  budget,
}: {
  budget: OverallBudget | CategoryBudgetWithLimitAsNumber;
}) {
  if (budget.duration === "WEEKLY") {
    const budgetStartingDay = weekStartDays.find(
      (day) => day.label === budget.weekStartDay,
    );

    const from = startOfWeek(new Date(), {
      weekStartsOn: budgetStartingDay?.value,
    });
    const to = endOfWeek(new Date(), {
      weekStartsOn: budgetStartingDay?.value,
    });

    return { from, to };
  } else if (budget.duration === "MONTHLY") {
    const budgetStartingDay = budget.monthStartDate;
    const today = new Date(new Date().toLocaleDateString());
    const startingDay = addDays(
      startOfMonth(new Date()),
      budgetStartingDay! - 1,
    );
    const firstDayOfMonth = startOfMonth(today);
    const firstDayOfLastMonth = startOfMonth(subMonths(firstDayOfMonth, 1));

    if (today >= startingDay) {
      const to = subDays(addMonths(startingDay, 1), 1);
      return { from: startingDay, to };
    } else {
      const from = addDays(firstDayOfLastMonth, budgetStartingDay! - 1);
      const to = subDays(addMonths(from, 1), 1);
      return { from, to };
    }
  } else if (budget.duration === "YEARLY") {
    const from = budget.yearStartDate!;
    const to = subDays(addYears(budget.yearStartDate!, 1), 1);
    return { from, to };
  } else {
    const from = new Date(new Date().toLocaleDateString());
    const to = endOfDay(new Date(from));
    return { from, to };
  }
}

type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
