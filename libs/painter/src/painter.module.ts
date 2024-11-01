import { Global, Module } from '@nestjs/common';
import { PainterService } from './painter.service';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { ConfigModule } from '@nestjs/config';
import { DOTS_MAP, MAP_IMAGE } from './di/tokens';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: MAP_IMAGE,
      useValue: readFileSync(resolve('assets', 'map.jpg')),
    },
    {
      provide: DOTS_MAP,
      useValue: new Map<string, [number, number]>(
        readFileSync(resolve('assets', 'dots.txt'))
          .toString()
          .split('\n')
          .map((line) => {
            const [tag, values] = line.split(' ');

            if (!values) {
              return null;
            }

            return [
              tag,
              values.split(',').map((value) => Number(value)) as [
                number,
                number,
              ],
            ];
          })
          .filter(value => !!value),
      ),
    },
    PainterService,
  ],
  exports: [PainterService],
})
export class PainterModule {}
