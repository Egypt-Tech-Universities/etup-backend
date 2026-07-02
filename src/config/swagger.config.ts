import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
  if (process.env.NODE_ENV === 'production') return;

  const config = new DocumentBuilder()
    .setTitle('Egyptian Universities API')
    .setDescription('API documentation for the Egyptian Universities Portal')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Universities')
    .addTag('Faculties')
    .addTag('Departments')
    .addTag('Auth')
    .addTag('Users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
