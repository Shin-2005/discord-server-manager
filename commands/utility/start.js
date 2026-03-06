import { TextInputBuilder, StringSelectMenuOptionBuilder, LabelBuilder, StringSelectMenuBuilder, TextInputStyle, ModalBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Start your RPG adventure!'),

  async execute(interaction) {
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
      new StringSelectMenuOptionBuilder().setLabel('Warrior').setValue('warrior'),
      new StringSelectMenuOptionBuilder().setLabel('Mage').setValue('mage'),
      new StringSelectMenuOptionBuilder().setLabel('Rogue').setValue('rogue'),
      new StringSelectMenuOptionBuilder().setLabel('Bard').setValue('bard'),
    );

    // Race Input
       const raceInput = new StringSelectMenuBuilder()
    .setCustomId('charRace')
    .setPlaceholder('Select your race')
    .setRequired(true)
    .addOptions(
      new StringSelectMenuOptionBuilder().setLabel('Human').setValue('human'),
      new StringSelectMenuOptionBuilder().setLabel('Elf').setValue('elf'),
      new StringSelectMenuOptionBuilder().setLabel('Dwarf').setValue('dwarf'),
      new StringSelectMenuOptionBuilder().setLabel('Orc').setValue('orc'),
       new StringSelectMenuOptionBuilder().setLabel('Halfling').setValue('halfling'),
      new StringSelectMenuOptionBuilder().setLabel('Dragonborn').setValue('dragonborn'),
      
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