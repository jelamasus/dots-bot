import { Module } from '@nestjs/common';
import { PainterService } from './painter.service';
import { readFileSync } from 'fs';
import { join } from 'path';

export const MAP_IMAGE = Symbol('Map image');

@Module({
  providers: [
    {
      provide: MAP_IMAGE,
      useValue: readFileSync(join(__dirname, '..', 'assets', 'map.jpg')),
    },
    PainterService,
  ],
  exports: [PainterService],
})
export class PainterModule {}
