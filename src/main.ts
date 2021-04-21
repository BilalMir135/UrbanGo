import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SetupSwagger } from './config/Swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SetupSwagger(app);
  await app.listen(3000);
}
bootstrap();
