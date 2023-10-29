import { MONTH_START_DATES, WEEK_START_DAYS } from "@/lib/constants";
import { toTitleCase } from "@/lib/utils";
import { Duration, OverallBudget } from "@prisma/client";
import {
  addDays,
  addMonths,
  addYears,
  endOfDay,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from "date-fns";
import { CategoryBudgetWithLimitAsNumber } from "@/types/types";

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
      const val = MONTH_START_DATES.find(
        (date) => date.value === monthStartDate.toString(),
      );
      return val?.label;
    case "YEARLY":
      return `Every ${format(yearStartDate, "MMMM do")}`;
    default:
      return "Everyday";
  }
}

interface GetBudgetDateRangeProps {
  budget: OverallBudget | CategoryBudgetWithLimitAsNumber;
}

export function getBudgetDateRange({ budget }: GetBudgetDateRangeProps) {
  if (budget.duration === "WEEKLY") {
    const budgetStartingDay = WEEK_START_DAYS.find(
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
