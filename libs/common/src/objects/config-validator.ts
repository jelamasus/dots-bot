import * as joi from 'joi';

export type ConfigData = {
  BOT_TOKEN: string;
  HORIZONTAL_OFFSET?: number;
  VERTICAL_OFFSET?: number;
  RADIUS?: number;
};

export const ConfigSchema = joi.object<ConfigData>({
  BOT_TOKEN: joi.string().regex(/\d+:[a-z0-9\-]+/i),
  HORIZONTAL_OFFSET: joi.number().optional(),
  VERTICAL_OFFSET: joi.number().optional(),
  RADIUS: joi.number().optional(),
});
