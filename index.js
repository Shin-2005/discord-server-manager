import dotenv from 'dotenv'
dotenv.config()

import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log('Bot logged in successfully!');
  })
  .catch((error) => {
    console.error('Error logging in:', error);
  });

  // Load commands from the 'commands' directory

  client.commands = new Collection();

  const foldersPath = path.join(__dirname, 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders){
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles){
      const filePath = path.join(commandsPath, file);
      const commandModule = await import(`file://${filePath}`);
      const command = commandModule.default;

      if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
  }


}

// Executing commands

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command){
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred){
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral,
      });
    }
  }
})
















client.on("messageCreate", async (message) => {
  
  if (message.author.bot) return;

  message.channel.send(`${message.content}`);
});