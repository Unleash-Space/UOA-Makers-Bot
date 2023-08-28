import { Job } from ".";

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
  getInterval: () => 1000 * 60 * 60 * 24 * 7,

  /**
   * Posts training times for the following week.
   */
  execute: async () => {},
};

export default job;
