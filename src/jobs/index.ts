import { Collection } from "discord.js";
import { importDefaultExportsInDir } from "@/common/utils";

/**
 * A job that runs at a scheduled time.
 */
export interface Job {
  name: string;
  getFirstRunDate: () => Date;
  getInterval: () => number;
  execute: () => Promise<void>;
}

/**
 * Map of jobs and their handlers.
 */
const jobs = new Collection(
  importDefaultExportsInDir(
    ["jobs"],
    (f: any): f is Job =>
      "name" in f &&
      "getFirstRunDate" in f &&
      "getInterval" in f &&
      "execute" in f
  ).map((j) => [j.name, j])
);

export default jobs;

/**
 * Executes a job.
 * @param job The job to execute.
 */
const executeJob = (job: Job) => {
  console.info(
    `Jobs: Executing job ${job.name} at ${new Date().toISOString()}`
  );
  job.execute();
};

/**
 * Sets up all jobs to run at their scheduled times.
 */
export const setupJobs = () => {
  for (const [name, job] of jobs) {
    console.info(`Jobs: Setting up job ${name} at ${new Date().toISOString()}`);

    // Run the job for the first time
    setTimeout(() => {
      executeJob(job);

      // Run the job every interval
      setInterval(() => executeJob(job), job.getInterval());
    }, job.getFirstRunDate().getTime() - Date.now());
  }
};
