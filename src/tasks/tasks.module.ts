//* Archivo principal del modulo, donde se importan los controladores y servicios
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';

@Module({
    controllers: [TasksController],
    providers: [TasksService]
})
export class TasksModule {}
