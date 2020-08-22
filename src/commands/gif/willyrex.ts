import { Command, CommandoMessage } from 'discord.js-commando';
import { Message } from 'discord.js';

import BerserkBot from '../../BerserkBot';

import { willyrexGifsUseCase } from './../../useCases';

export = class WillyrexCommand extends Command {
  constructor(client: BerserkBot) {
    super(client, {
      name: 'willyrex',
      memberName: 'willyrex',
      group: 'gif',
      description: 'Genera una imagen de Willyrex al servidor.',
    });
  }

  async run(message: CommandoMessage): Promise<Message | Message[]> {
    const gifLink = await willyrexGifsUseCase.execute();
    return message.reply(gifLink);
  }
};
