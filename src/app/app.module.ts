import { Module } from '@nestjs/common';
// import { BotModule } from '../modules/bot/bot.module';
import { CommonModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigSchema } from '@app/common/objects/config-validator';
import { BotModule } from 'src/modules/bot/bot.module';

@Module({
  imports: [
    CommonModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: ConfigSchema,
      isGlobal: true,
    }),
    BotModule,
  ],
})
export class AppModule {}
