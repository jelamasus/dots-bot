import { Logger } from '@nestjs/common';
import { Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { ExecutorService } from '../executor/executor.service';
import { bold } from 'telegraf/typings/format';

@Update()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(private readonly executorService: ExecutorService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(
      `<u><b>Рисую точечки на картиночке</b></u>

<b>Вот пример запроса ко мне</b>
<i>серия_1
100-200: PZ p1 p2 p3
200-300: C1 c2 c3 c4 cz</i>

Скопируй и посмотри на результат

<u>Примечание:</u> 
<i>разделители между точками и их регистр НЕ ИГРАЮТ РОЛИ,
главное - это двоеточие после названия строки</i>`,
      {
        parse_mode: 'HTML',
      },
    );
  }

  @On('text')
  async paintImages(@Ctx() ctx: Context & { message: Message.TextMessage }) {
    try {
      const text = ctx.message.text.trim();
      const lines = text.split('\n');
      if (lines.length < 2) {
        throw new Error('Я не знаю что с этим делать');
      }

      await ctx.reply('Рисую...');
      await ctx.sendChatAction('upload_photo');

      const prefix = lines.shift().trim();
      const images = await this.executorService.createImages(prefix, lines);

      await ctx.replyWithMediaGroup(
        images.map(({ image, name }) => ({
          type: 'document',
          media: {
            source: image,
            filename: name,
          },
        })),
      );
    } catch (error) {
      this.logger.error(error.message);
      await ctx.reply(`Ошибка: ${error.message}`);
    }
  }
}
