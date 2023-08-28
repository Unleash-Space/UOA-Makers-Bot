import {
  EVENTBRITE_EVENTS,
  EVENTBRITE_EVENTS_FROM_DATE,
  EVENTBRITE_EVENTS_TOKEN,
  EVENTBRITE_EVENTS_TO_DATE,
  EVENTBRITE_ORGS_URL,
} from "./constants";

/**
 * Represents an Eventbrite event.
 */
interface EventbriteEvent {
  id: string;
  title: string;
  summary?: string;
  description: any;
  capacity?: number;
  start: { timezone: string; local: string; utc: string };
}

/**
 * Gets all events in a week.
 * @param startDate The start date.
 * @param endDate The end date.
 * @returns A promise that resolves to an array of events.
 */
export const getEventsInWeek = async (
  startDate: Date,
  endDate: Date
): Promise<EventbriteEvent[]> => {
  // Create an endpoint URL for the Eventbrite API
  const endpoint = new URL(
    `${EVENTBRITE_ORGS_URL}/${process.env.EVENTBRITE_ORG_ID}/${EVENTBRITE_EVENTS}`
  );
  endpoint.searchParams.append(
    EVENTBRITE_EVENTS_FROM_DATE,
    toYYYYMMDD(startDate)
  );
  endpoint.searchParams.append(EVENTBRITE_EVENTS_TO_DATE, toYYYYMMDD(endDate));
  endpoint.searchParams.append(
    EVENTBRITE_EVENTS_TOKEN,
    process.env.EVENTBRITE_TOKEN
  );

  // Fetch the data
  return (await (await fetch(endpoint.toString())).json()).events.map(
    (e: any) => ({
      id: e.id,
      title: e.name.text,
      summary: e.summary,
      description: e.description,
      capacity: e.capacity,
      start: new Date(e.start.utc),
    })
  ) as EventbriteEvent[];
};

/**
 * Converts a date to a YYYY-MM-DD string.
 * @param date The date to convert.
 * @returns A YYYY-MM-DD string.
 */
export const toYYYYMMDD = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
