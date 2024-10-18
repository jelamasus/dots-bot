import * as joi from 'joi';

export type ConfigData = {
  BOT_TOKEN: string;
};

export const ConfigSchema = joi.object<ConfigData>({
  BOT_TOKEN: joi.string().regex(/\d+:[a-z0-9\-]+/i),
});
