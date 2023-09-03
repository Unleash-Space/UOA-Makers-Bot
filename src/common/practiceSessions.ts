import { EventbriteEvent } from "@/common/EventbriteApi";
import { formatDate } from "./utils";

const DISCORD_MESSAGE_LIMIT = 2000;
const EVENTBRITE_EVENT_URL = "https://www.eventbrite.co.nz/e/";

/**
 * Finds practice sessions in a list of events.
 * @param events The events to search.
 * @returns The practice sessions.
 */
export const findPracticeSessions = (events: EventbriteEvent[]) =>
  events.filter((e) => e.title.includes("Practice Session"));

/**
 * Groups events by title.
 * @param events The events to group.
 * @returns The grouped events.
 */
export const groupEventsByTitle = (events: EventbriteEvent[]) => {
  const groups: Record<string, EventbriteEvent[]> = {};

  for (const event of events) {
    if (!groups[event.title]) groups[event.title] = [];
    groups[event.title].push(event);
  }

  return groups;
};

/**
 * Formats a group of practice sessions with the same title into a discord
 * message.
 * @param sessions The practice sessions.
 * @returns A discord message.
 */
export const formatSimilarPracticeSessions = (sessions: EventbriteEvent[]) => {
  // Show title, date, and make link
  const message = `**${sessions[0].title}**\n`;

  const sessionTimes = sessions.map(
    (session) =>
      `  :small_blue_diamond:  [${formatDate(
        session.start
      )}](<${EVENTBRITE_EVENT_URL}${session.id}>)`
  );

  return message + sessionTimes.join("\n");
};

/**
 * Groups discord messages into line-separated groups of 4000 characters or
 * less.
 * @param messages The messages to group.
 * @returns An array of grouped messages.
 */
export const groupDiscordMessages = (messages: string[]) => {
  const groups: string[] = [];
  let group = "";

  for (const message of messages) {
    if (group.length + message.length > DISCORD_MESSAGE_LIMIT) {
      groups.push(group);
      group = "";
    }

    group += message + "\n\n";
  }

  if (group.length > 0) groups.push(group);

  return groups;
};
