import { GatewayIntentBits } from "discord.js";
import CustomClient from "@/CustomClient";
import commands from "@/commands";

const client = new CustomClient(
  { intents: [GatewayIntentBits.Guilds] },
  commands
);

export default client;
