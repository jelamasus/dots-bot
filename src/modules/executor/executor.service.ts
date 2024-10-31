import { PainterService } from '@app/painter';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ExecutorService {
  constructor(private readonly painterService: PainterService) {}

  public async createImages(prefix: string, lines: string[]) {
    const images: {
      image: Buffer;
      name: string;
    }[] = [];

    for (const line of lines) {
      const { title, values } = this.parseLine(line);
      const image = await this.painterService.paintDots(values);

      images.push({
        image,
        name: `${prefix}_${title}.jpg`,
      });
    }

    return images;
  }

  private parseLine(line: string) {
    const parsed = /(?<title>[a-b0-9\-\_]+):(?<values>[^:]+)/i.exec(line);
    if (!parsed) {
      throw new Error(`Ошибка в строке "${line}"`);
    }

    const { title, values } = parsed.groups as {
      title: string;
      values: string;
    };

    return {
      title: title.trim(),
      values: values
        .split(/[^a-z0-9]+/gi)
        .filter((value) => !!value)
        .map((value) => value.toUpperCase().trim()),
    };
  }
}
