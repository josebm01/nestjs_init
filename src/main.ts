import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  //* Configuración de Swagger para la documentación de la API
  const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();  

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);    

  //* Cors - Habilitamos el acceso desde otros dominios (por ejemplo, desde un frontend en otro puerto)
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
  })

  //* Habilitamos la validación de datos de entrada para todas las rutas (si tiene un DTO con validaciones, se aplicarán automáticamente)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades que no están en el DTO
  }))

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
