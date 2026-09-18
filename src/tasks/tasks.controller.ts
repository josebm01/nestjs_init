//* Controlador del modulo, donde se definen las rutas y se llaman a los servicios
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import type { UpdateTaskDto } from './dto/update-task.dto.js';

@Controller('/tasks')
export class TasksController {

    tasksService: TasksService;

    constructor( tasksService: TasksService ) {
        this.tasksService = tasksService;
    }

    @Get()
    getAllTasks() {
        return this.tasksService.getTasks();
    }

    @Get('/:id')
    getTask( @Param('id') id: string ) {
        return this.tasksService.getTask( parseInt(id) );
    }

    @Get('/message')
    getMessage() {
        return this.tasksService.getMessage();
    }

    @Post()
    createTask( @Body() task: CreateTaskDto ) {
        return this.tasksService.createTask(task);
    }

    @Put()
    updateTask(@Body() task: UpdateTaskDto) {
        return this.tasksService.updateTask(task);
    }

    @Delete()
    deleteTask() {
        return this.tasksService.deleteTask();
    }

    @Patch()
    updateTaskStatus() {
        return this.tasksService.updateTaskStatus();
    }

}
