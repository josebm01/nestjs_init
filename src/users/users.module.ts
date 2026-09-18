import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware.js';

@Module({
  providers:   [UsersService],
  controllers: [UsersController]
})

//* Implementando middleware para el módulo de usuarios
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes('/users'); // todas las rutas
      .forRoutes( // rutas específicas
        { 
          path: '/users',
          method: RequestMethod.GET
        }
      )
  }
}
