"use client";

import { TopCategory } from "@/types/types";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface TopCategoriesChart {
  topCategories: TopCategory[];
}

export const TopCategoriesChart = ({ topCategories }: TopCategoriesChart) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-[160px] w-[160px]" />;
  }

  return (
    <ResponsiveContainer width={160} height={160}>
      <PieChart>
        <Pie
          data={topCategories}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {topCategories.map((topCategory, index) => (
            <Cell key={`cell-${index}`} fill={topCategory.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
