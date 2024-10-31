import { Inject, Injectable } from '@nestjs/common';
import { DOTS_MAP, MAP_IMAGE } from './di/tokens';
import { CanvasRenderingContext2D, createCanvas, loadImage } from 'canvas';
import { ConfigService } from '@nestjs/config';
import { ConfigData } from '@app/common/objects/config-validator';

const START_ANGLE = Math.PI * 2;
const DEFAULT_RADIUS = 7;

@Injectable()
export class PainterService {
  constructor(
    @Inject(MAP_IMAGE) private readonly mapImage: Buffer,
    @Inject(DOTS_MAP) private readonly dotsMap: Map<string, [number, number]>,
    private readonly configService: ConfigService<ConfigData, true>,
  ) {}

  public async paintDots(dots: string[]) {
    const { canvas, ctx } = await this.create();

    const radius = this.configService.get('RADIUS') || DEFAULT_RADIUS;
    const horizontalOffset = this.configService.get('HORIZONTAL_OFFSET') || 0;
    const verticalOffset = this.configService.get('VERTICAL_OFFSET') || 0;

    for (const dot of dots) {
      const [x, y] = this.getDot(dot.toUpperCase());
      await this.setDot({
        ctx,
        center: [x + horizontalOffset, y + verticalOffset],
        radius,
      });
    }

    return canvas.toBuffer();
  }

  private getDot(title: string): [number, number] {
    const dot = this.dotsMap.get(title);

    if (!dot) {
      throw new Error(`Неизвестная точка: ${title}`);
    }

    return dot;
  }

  private async create() {
    const image = await loadImage(this.mapImage);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

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
