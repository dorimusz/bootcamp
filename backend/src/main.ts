import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1'); //kinda can do the same in the app.controller as @Controller() takes a string as a parameter

  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: true,
  };
  const config = new DocumentBuilder()
    .setTitle('Bootcamp')
    .setDescription('The Bootcamp API description')
    .setVersion('1.0')
    .addTag('Endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
