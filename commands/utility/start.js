import { TextInputBuilder, StringSelectMenuOptionBuilder, LabelBuilder, StringSelectMenuBuilder, TextInputStyle, ModalBuilder, SlashCommandBuilder } from 'discord.js';
import Schema from '../../schemas/modal.js';
export default {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Start your RPG adventure!'),

  async execute(interaction) {

    const existingCharacter = await Schema.findOne({ userId: interaction.user.id });
    if (existingCharacter){
      return interaction.reply({
        content: 'You already have a character created!',
        ephemeral: true,
      });
    }
        


    const modal = new ModalBuilder()
    .setCustomId('createCharacter')
    .setTitle('Create Your Character');

    // Name Input

    const nameInput = new TextInputBuilder()
    .setCustomId('charName')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

    // Class Input

   const classInput = new StringSelectMenuBuilder()
    .setCustomId('charClass')
    .setPlaceholder('Select your class')
    .setRequired(true)
    .addOptions(
      new StringSelectMenuOptionBuilder().setLabel('Warrior').setValue('Warrior'),
      new StringSelectMenuOptionBuilder().setLabel('Mage').setValue('Mage'),
      new StringSelectMenuOptionBuilder().setLabel('Rogue').setValue('Rogue'),
      new StringSelectMenuOptionBuilder().setLabel('Bard').setValue('Bard'),
    );

    // Race Input
       const raceInput = new StringSelectMenuBuilder()
    .setCustomId('charRace')
    .setPlaceholder('Select your race')
    .setRequired(true)
    .addOptions(
      new StringSelectMenuOptionBuilder().setLabel('Human').setValue('Human'),
      new StringSelectMenuOptionBuilder().setLabel('Elf').setValue('Elf'),
      new StringSelectMenuOptionBuilder().setLabel('Dwarf').setValue('Dwarf'),
      new StringSelectMenuOptionBuilder().setLabel('Orc').setValue('Orc'),
      new StringSelectMenuOptionBuilder().setLabel('Halfling').setValue('Halfling'),
      new StringSelectMenuOptionBuilder().setLabel('Dragonborn').setValue('Dragonborn'),

    );

    // Label Builders

    const nameLabel = new LabelBuilder()
    .setLabel('Name')
    .setTextInputComponent(nameInput);
    

    const classLabel = new LabelBuilder()
    .setLabel('Class')
    .setStringSelectMenuComponent(classInput);

    const raceLabel = new LabelBuilder()
    .setLabel('Race')
    .setStringSelectMenuComponent(raceInput);

    modal.addLabelComponents(nameLabel, classLabel, raceLabel);

    await interaction.showModal(modal);

  },

  
};