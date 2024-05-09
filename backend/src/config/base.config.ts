import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const EnvVariables = z.object({
  CORS_ORIGIN: z.string().url(),
});

export default registerAs('base', () => {
  const validatedConfig = EnvVariables.parse(process.env);

  return validatedConfig;
});
