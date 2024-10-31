import { Module } from '@nestjs/common';
// import { BotModule } from '../modules/bot/bot.module';
import { CommonModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigSchema } from '@app/common/objects/config-validator';
import { BotModule } from 'src/modules/bot/bot.module';
import { PainterModule } from '@app/painter';
import { ExecutorModule } from 'src/modules/executor/executor.module';

@Module({
  imports: [
    CommonModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: ConfigSchema,
      isGlobal: true,
    }),
    PainterModule,
    ExecutorModule,
    BotModule,
  ],
})
export class AppModule {}
