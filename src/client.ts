import { GatewayIntentBits } from "discord.js";
import BotClient from "@/BotClient";
import commands from "@/commands";

/**
 * The one and only client.
 */
const client = new BotClient({ intents: [GatewayIntentBits.Guilds] }, commands);

export default client;
