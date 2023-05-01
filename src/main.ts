import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipNullProperties: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Gallery Service')
    .setDescription('The gallery-service API description')
    .setVersion('1.0')
    .addTag('galllery-service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.listen(process.env.PORT || 3000)

  console.info(`Listening on port: ${process.env.PORT}`)
}
bootstrap();
