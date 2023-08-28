import {
  Collection,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { importDefaultExportsInDir } from "@/common/utils";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

/**
 * Map of commands and their handlers.
 */
const commands = new Collection(
  importDefaultExportsInDir(
    ["commands"],
    (f: any): f is Command => "data" in f && "execute" in f
  ).map((c) => [c.data.name, c])
);

export default commands;
