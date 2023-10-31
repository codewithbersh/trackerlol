export function getRangeDefaultValue(range: string | undefined) {
  switch (range?.toLowerCase()) {
    case "week":
      return "week";
    case "year":
      return "year";
    default:
      return "month";
  }
}
