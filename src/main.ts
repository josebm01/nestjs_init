import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  //* Habilitamos la validación de datos de entrada para todas las rutas (si tiene un DTO con validaciones, se aplicarán automáticamente)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades que no están en el DTO
  }))

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
