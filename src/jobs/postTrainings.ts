import { EventbriteApi } from "@/common/api";
import { Job } from ".";
import client from "@/client";
import { TextBasedChannel } from "discord.js";

const THREE_WEEKS = 7 * 24 * 60 * 60 * 1000 * 3;

const isTextBasedChannel = (c: any): c is TextBasedChannel =>
  "send" in c && typeof c.send === "function";

/**
 * A job that posts training times for the following week every Saturday.
 */
const job: Job = {
  name: "postTrainings",

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
  getInterval: () => THREE_WEEKS,

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
      new Date(),
      new Date(new Date().getTime() + THREE_WEEKS)
    );

    await channel.send(JSON.stringify(events));
  },
};

export default job;
