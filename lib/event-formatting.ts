type EventLocale = "en" | "id";

export function formatEventDateRange(
  startDate: string,
  endDate: string,
  locale: EventLocale,
) {
  const normalizedLocale = locale === "id" ? "id-ID" : "en-US";
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "";
  }

  const sameDay =
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth() &&
    start.getUTCDate() === end.getUTCDate();

  if (sameDay) {
    return start.toLocaleDateString(normalizedLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return `${start.toLocaleDateString(normalizedLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} - ${end.toLocaleDateString(normalizedLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}

export function formatEventLocation(
  locationDetail: string,
  locationGeneral: string,
) {
  return [locationDetail, locationGeneral].filter(Boolean).join(", ");
}
