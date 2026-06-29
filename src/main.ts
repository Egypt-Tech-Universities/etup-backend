import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { validationPipe } from './config/validation.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1) Enable CORS
  app.enableCors();

  // 2) Serve static files from 'uploads' folder
  app.useStaticAssets(path.join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // 3) Global Validation Pipe
  app.useGlobalPipes(validationPipe);

  // 4) API Prefix
  app.setGlobalPrefix('api', { exclude: ['/'] });

  // 5) Swagger
  setupSwagger(app);

  // 6) Start server
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Server running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
  console.log(`📁 Uploads: http://localhost:${port}/uploads`);
}
bootstrap();
