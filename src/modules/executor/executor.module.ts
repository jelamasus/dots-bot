import { PainterModule } from '@app/painter';
import { Module } from '@nestjs/common';
import { ExecutorService } from './executor.service';

@Module({
  imports: [PainterModule],
  providers: [ExecutorService],
  exports: [ExecutorService],
})
export class ExecutorModule {}
