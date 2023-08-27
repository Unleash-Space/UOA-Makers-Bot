import "dotenv/config";
import { registerCommands } from "@/commands";
import { Client, GatewayIntentBits } from "discord.js";

registerCommands();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(process.env.TOKEN);

client.on("ready", () => {
  if (!client.user) return;

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});
