import { ConfigData } from '@app/common/objects/config-validator';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { ExecutorModule } from '../executor/executor.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigData, true>) => ({
        token: configService.get('BOT_TOKEN'),
      }),
    }),
    ExecutorModule,
  ],
  providers: [BotService],
})
export class BotModule {}
