import { TextInputBuilder, StringSelectMenuOptionBuilder, LabelBuilder, StringSelectMenuBuilder, TextInputStyle, ModalBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Start your RPG adventure!'),

  async execute(interaction) {
    const modal = new ModalBuilder()
    .setCustomId('createCharacter')
    .setTitle('Create Your Character');

    const nameInput = new TextInputBuilder()
    .setCustomId('charName')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

    const nameLabel = new LabelBuilder()
    .setLabel('Name')
    .setTextInputComponent(nameInput);
    

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

    const classLabel = new LabelBuilder()
    .setLabel('Class')
    .setStringSelectMenuComponent(classInput);

    modal.addLabelComponents(nameLabel, classLabel);

    await interaction.showModal(modal);

  },
};