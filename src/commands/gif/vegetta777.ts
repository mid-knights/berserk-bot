import { Command, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';

import BerserkBot from '../../domain/BerserkBot';

import { vegetta777GifsUseCase } from './../../useCases';

export = class WillyrexCommand extends Command {
  constructor(client: BerserkBot) {
    super(client, {
      name: 'vegeta777',
      memberName: 'vegeta777',
      group: 'gif',
      description: 'Genera una gif animado de Vegeta777 al servidor.',
    });
  }

  async run(message: CommandoMessage): Promise<Message | Message[]> {
    try {
      const result = await vegetta777GifsUseCase.execute();

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
