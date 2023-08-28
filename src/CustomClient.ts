import "dotenv/config";
import {
  CacheType,
  Client,
  ClientOptions,
  Collection,
  Events,
  Interaction,
} from "discord.js";
import { Command } from "./commands";

/**
 * A discord.js client with commands.
 */
class CustomClient<Ready extends boolean = boolean> extends Client<Ready> {
  commands: Collection<string, Command>;

  constructor(options: ClientOptions, commands: CustomClient["commands"]) {
    super(options);
    this.commands = commands;

    this.once(Events.ClientReady, this.handleReady);
    this.on(Events.InteractionCreate, this.handleInteractionCreate);
  }

  /**
   * Handles the ready event.
   */
  handleReady() {
    console.log(`Ready! Logged in as ${(this as CustomClient<true>).user.tag}`);
  }

  /**
   * Handle slash commands.
   * @param interaction The interaction.
   */
  async handleInteractionCreate(interaction: Interaction<CacheType>) {
    if (!interaction.isChatInputCommand()) return; // Only handle slash commands
    console.log(interaction);

    // Get the command from the client.commands Collection
    const command = this.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      // Execute the correct command
      await command.execute(interaction);
    } catch (error) {
      // Show friendly error messages to the user
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  }
}

export default CustomClient;
