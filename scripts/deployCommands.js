/**
 * This script will deploy all the commands in the commands directory. This
 * script is meant to be run manually, and is not required for the bot to
 * function. You can run this script by running `pnpm run deploy-commands` in
 * your terminal.
 */
require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, "../", "dist", "commands");

const commands = fs
  // Get all command files
  .readdirSync(foldersPath)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  // Import each command file
  .map((file) => {
    const filePath = path.join(foldersPath, file);
    const command = require(filePath).default;

    if ("data" in command && "execute" in command) return command.data.toJSON();

    throw Error(
      `The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  });

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);
const deployCommands = async () => {
  try {
    console.info(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.info(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
};

deployCommands();
