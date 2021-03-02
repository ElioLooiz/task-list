export default function dateFilter(value, format = "datetime") {
  const options = {};

  if (format.includes("date")) {
    options.year = "numeric";
    options.month = "2-digit";
    options.day = "2-digit";
  }

  if (format.includes("time")) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    // options.second = "2-digit";
  }

  return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
}
