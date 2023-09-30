import { useEffect, useState } from "react";

interface ProgressProvider {
  valueStart: number;
  valueEnd: number;
  children: any;
}

export const ProgressProvider = ({
  valueStart,
  valueEnd,
  children,
}: ProgressProvider) => {
  const [value, setValue] = useState(valueStart);
  useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};
