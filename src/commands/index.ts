import {
  Collection,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { join } from "path";
import { readdirSync } from "fs";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

const isCommandFile = (f: any): f is Command => "data" in f && "execute" in f;

// Map of commands and their handlers
const commands = new Collection(
  // Get all command files
  readdirSync(__dirname)
    .filter((file) => file !== "index.js" && file.endsWith(".js"))
    // Import each command file
    .map((file) => {
      const filePath = join(__dirname, file);
      const command = require(filePath).default;
      if (isCommandFile(command)) return [command.data.name, command];

      throw Error(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    })
);
export default commands;
