import { IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvironmentVariables {
  @IsString()
  DB_NAME: string;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_USER: string;

  @IsNumber()
  DB_PORT: number;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
