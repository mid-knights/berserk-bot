import { Command, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';

import BerserkBot from '../../domain/BerserkBot';

import { willyrexGifsUseCase } from './../../useCases';

export = class WillyrexCommand extends Command {
  constructor(client: BerserkBot) {
    super(client, {
      name: 'willyrex',
      memberName: 'willyrex',
      group: 'gif',
      description: 'Genera una gif animado de Willyrex al servidor.',
    });
  }

  async run(message: CommandoMessage): Promise<Message | Message[]> {
    try {
      const result = await willyrexGifsUseCase.execute();

      if (result.isRight()) {
        const embed = new MessageEmbed();

        embed.setColor('#B2DFDB');
        embed.setAuthor(
          message.author.username,
          message.author.avatarURL() || undefined
        );
        embed.setImage(
          result.value.getValue() ||
            'https://cdn.dribbble.com/users/1753953/screenshots/3818675/animasi-emptystate.gif'
        );

        return message.channel.send({ embed });
      }

      if (result.isLeft()) {
        const errors = result.value;
        return message.reply(errors.errorValue().message);
      }

      return message.reply('something broke, i guess');
    } catch (e) {
      return message.reply(e);
    }
  }
};
