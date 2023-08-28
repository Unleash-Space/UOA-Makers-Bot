import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from ".";

/**
 * A ping command.
 */
const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply("Pong!");
  },
};

export default command;
