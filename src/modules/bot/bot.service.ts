import { Logger } from '@nestjs/common';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotService {
  private readonly logger = new Logger('Bot');

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Hello!');
  }
}
