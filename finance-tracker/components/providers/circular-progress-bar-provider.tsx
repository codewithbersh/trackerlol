import { useEffect, useState } from "react";

interface CircularProgressBarProviderProps {
  valueStart: number;
  valueEnd: number;
  children: any;
}

export const CircularProgressBarProvider = ({
  valueStart,
  valueEnd,
  children,
}: CircularProgressBarProviderProps) => {
  const [value, setValue] = useState(valueStart);
  useEffect(() => {
    setTimeout(() => {
      setValue(valueEnd);
    }, 1000);
  }, [valueEnd]);

  return children(value);
};
