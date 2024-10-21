import { Inject, Injectable } from '@nestjs/common';
import { MAP_IMAGE } from './painter.module';
import { CanvasRenderingContext2D, createCanvas, loadImage } from 'canvas';

const START_ANGLE = Math.PI * 2;

@Injectable()
export class PainterService {
  constructor(@Inject(MAP_IMAGE) private readonly mapImage: Buffer) {}

  private async create() {
    const image = await loadImage(this.mapImage);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, image.width, image.height);

    return {
      canvas,
      ctx,
    };
  }

  private setDot({
    ctx,
    center,
    radius,
  }: {
    ctx: CanvasRenderingContext2D;
    center: [number, number];
    radius: number;
  }): Promise<void> {
    return new Promise((resolve) => {
      ctx.beginPath();
      ctx.arc(center[0], center[1], radius, START_ANGLE, 0);
      ctx.fillStyle = 'black';
      ctx.fill();

      resolve();
    });
  }
}
