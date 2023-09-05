import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_RABBIT_PORT = 5672;

export interface RabbitConfig {
  notify:{
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: number;
  },
  user:{
    host: string;
    password: string;
    user: string;
    queue: string;
    exchange: string;
    port: number;
  }
}

export default registerAs('rabbit', (): RabbitConfig => {
  const config: RabbitConfig = {
    notify: {
      host: process.env.RABBIT_HOST,
      password: process.env.RABBIT_PASSWORD,
      port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(), 10),
      user: process.env.RABBIT_USER,
      queue: process.env.RABBIT_QUEUE_1,
      exchange: process.env.RABBIT_EXCHANGE_1,
    },
    user: {
      host: process.env.RABBIT_HOST,
      password: process.env.RABBIT_PASSWORD,
      port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(), 10),
      user: process.env.RABBIT_USER,
      queue: process.env.RABBIT_QUEUE_2,
      exchange: process.env.RABBIT_EXCHANGE_2,
    }

  };

  const validationSchema = Joi.object<RabbitConfig>({
    notify: Joi.object({
      host: Joi.string().valid().hostname().required(),
      password: Joi.string().required(),
      port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
      user: Joi.string().required(),
      queue: Joi.string().required(),
      exchange: Joi.string().required(),
    }),
    user: Joi.object({
      host: Joi.string().valid().hostname().required(),
      password: Joi.string().required(),
      port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
      user: Joi.string().required(),
      queue: Joi.string().required(),
      exchange: Joi.string().required(),
    })
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Notify Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;

});
