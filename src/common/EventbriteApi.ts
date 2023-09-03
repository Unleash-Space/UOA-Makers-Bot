import { toYYYYMMDD } from "@/common/utils";

/**
 * Represents an Eventbrite event.
 */
export interface EventbriteEvent {
  id: string;
  title: string;
  summary?: string;
  description: any;
  capacity?: number;
  start: Date;
}

/**
 * Abstracts the Eventbrite API.
 */
export class EventbriteApi {
  EVENTBRITE_ORGS_URL = "https://www.eventbriteapi.com/v3/organizations";
  EVENTBRITE_EVENTS = "events";
  EVENTBRITE_EVENTS_FROM_DATE = "start_date.range_start";
  EVENTBRITE_EVENTS_TO_DATE = "start_date.range_end";
  EVENTBRITE_EVENTS_TOKEN = "token";

  private url: URL;

  /**
   * The constructor.
   * @param token The Eventbrite API token.
   */
  constructor(token: string) {
    // Create an endpoint URL for the Eventbrite API
    const url = new URL(
      `${this.EVENTBRITE_ORGS_URL}/${process.env.EVENTBRITE_ORG_ID}`
    );
    url.searchParams.append(this.EVENTBRITE_EVENTS_TOKEN, token);

    this.url = url;
  }

  /**
   * Constructs an endpoint URL.
   * @param pathname The path to the endpoint.
   * @param searchParams The search parameters.
   * @returns The endpoint URL.
   */
  constructEndpoint(pathname: string, searchParams: Record<string, string>) {
    const endpoint = new URL(this.url);
    endpoint.pathname += `/${pathname}`;
    for (const [key, value] of Object.entries(searchParams)) {
      endpoint.searchParams.append(key, value);
    }

    return endpoint;
  }

  /**
   * Gets all events in a week.
   * @param startDate The start date.
   * @param endDate The end date.
   * @returns A promise that resolves to an array of events.
   */
  async getEventsInWeek(
    startDate: Date,
    endDate: Date
  ): Promise<EventbriteEvent[]> {
    const endpoint = this.constructEndpoint(this.EVENTBRITE_EVENTS, {
      [this.EVENTBRITE_EVENTS_FROM_DATE]: toYYYYMMDD(startDate),
      [this.EVENTBRITE_EVENTS_TO_DATE]: toYYYYMMDD(endDate),
    });

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
  }
}
