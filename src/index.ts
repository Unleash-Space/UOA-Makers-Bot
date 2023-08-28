import "dotenv/config";
import { setupJobs } from "@/jobs";
import client from "./client";

client.login(process.env.TOKEN).then(() => {
  // Set up jobs
  setupJobs();
});
