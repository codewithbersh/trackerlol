"use client";

import { TopCategory } from "@/types/types";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CategoriesChartProps {
  categories: TopCategory[];
}

export const CategoriesChart = ({ categories }: CategoriesChartProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-[160px] w-[160px]" />;
  }

  return (
    <ResponsiveContainer width={160} className="aspect-square">
      <PieChart>
        <Pie
          data={categories}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          strokeWidth={0}
        >
          {categories.map((category, index) => (
            <Cell key={`cell-${index}`} fill={category.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
