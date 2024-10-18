import { Module } from '@nestjs/common';
import { PainterService } from './painter.service';

@Module({
  providers: [PainterService],
  exports: [PainterService],
})
export class PainterModule {}
