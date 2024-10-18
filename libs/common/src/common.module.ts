import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class CommonModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: CommonModule,
    };
  }
}
