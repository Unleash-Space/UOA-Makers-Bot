import "dotenv/config";
import { GatewayIntentBits } from "discord.js";
import CustomClient from "@/CustomClient";
import commands from "@/commands";
import { setupJobs } from "@/jobs";

// Create a new client instance
const client = new CustomClient(
  { intents: [GatewayIntentBits.Guilds] },
  commands
);
client.login(process.env.TOKEN);

// Set up jobs
setupJobs();
