import { Command, CommandoMessage } from 'discord.js-commando';
import { Message, MessageEmbed } from 'discord.js';

import BerserkBot from '../../domain/BerserkBot';

import { instagramUseCase } from './../../useCases';
import { InstagramDTO } from '../../useCases/getInstagramImage/InstagramDTO';

interface InstagramCommandArguments {
  username: string;
}

export = class InstagramCommand extends Command {
  constructor(client: BerserkBot) {
    super(client, {
      name: 'instagram',
      memberName: 'instagram',
      group: 'gif',
      description: 'Devuelve una imagen reciente del artista.',
      args: [
        {
          key: 'username',
          type: 'string',
          prompt: 'Nombre del instagramer',
          default: '',
        },
      ],
    });
  }

  async run(
    message: CommandoMessage,
    args: InstagramCommandArguments
  ): Promise<Message | Message[]> {
    try {
      const dto: InstagramDTO = {
        username: args.username,
      };

      const result = await instagramUseCase.execute(dto);

      if (result.isRight()) {
        const embed = new MessageEmbed();

        embed.setColor('#F8BBD0');
        embed.setAuthor(
          `@${args.username}`,
          result.value.getValue()?.avatarUrl || undefined
        );
        embed.setImage(
          result.value.getValue()?.imageUrl ||
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
