import { EventbriteApi } from "@/common/EventbriteApi";
import { Job } from ".";
import client from "@/client";
import { TextBasedChannel } from "discord.js";
import {
  findPracticeSessions,
  formatSimilarPracticeSessions,
  groupDiscordMessages,
  groupEventsByTitle,
} from "@/common/practiceSessions";

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

const isTextBasedChannel = (c: any): c is TextBasedChannel =>
  "send" in c && typeof c.send === "function";

/**
 * A job that posts training times for the following week every Saturday.
 */
const job: Job = {
  name: "postPracticeSessions",

  /**
   * Calculates the first date to run this job.
   * @returns The next Saturday at 12:00:00.
   */
  getFirstRunDate: () => {
    const d = new Date();
    d.setDate(d.getDate() + ((7 - d.getDay()) % 7) + 1);
    d.setHours(12, 0, 0, 0);
    return d;
  },

  /**
   * Calculates the interval between runs.
   * @returns 7 days.
   */
  getInterval: () => ONE_WEEK,

  /**
   * Posts training times for the following week.
   */
  execute: async () => {
    // Get channel
    const channel = await client.channels.fetch(process.env.EVENTS_CHANNEL_ID);
    if (!isTextBasedChannel(channel))
      throw new Error(
        `postTrainings: Channel ${process.env.EVENTS_CHANNEL_ID} is not text-based`
      );

    // Get events
    const api = new EventbriteApi(process.env.EVENTBRITE_TOKEN);
    const events = await api.getEventsInWeek(
      new Date(new Date().getTime()),
      new Date(new Date().getTime() + ONE_WEEK)
    );

    const messages = Object.values(
      groupEventsByTitle(findPracticeSessions(events))
    ).map(formatSimilarPracticeSessions);

    // If no practice sessions found, do nothing
    if (messages.length === 0) {
      console.info("postPracticeSessions: No practice sessions found");
      return;
    }

    // Create message using emojis
    groupDiscordMessages([
      "## :sparkles: What can I learn this week? :sparkles:\nBefore attending a practice session, please make sure to do the prerequisites on the event page.",
      ...messages,
    ]).forEach(async (message) => await channel.send(message));
  },
};

export default job;
