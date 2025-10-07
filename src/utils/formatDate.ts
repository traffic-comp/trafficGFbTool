export default function formatDate(dateString: string): string {
  let date: Date;

  if (dateString.includes("(")) {
    // формат: "2025-08-03 21:59:42(UTC+01:00)"
    const match = dateString.match(
      /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})\(UTC([+-]\d{2}):(\d{2})\)$/
    );

    if (match) {
      const [, ymd, hms, offsetHour, offsetMin] = match;
      const [year, month, day] = ymd.split("-").map(Number);
      const [hour, minute, second] = hms.split(":").map(Number);

      // создаём UTC дату
      date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

      // учитываем смещение
      const offset = parseInt(offsetHour, 10) * 60 + parseInt(offsetMin, 10);
      date.setUTCMinutes(date.getUTCMinutes() - offset);
    } else {
      throw new Error("Invalid date format: " + dateString);
    }
  } else {
    // ISO-строка
    date = new Date(dateString);
  }

  return date.toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
