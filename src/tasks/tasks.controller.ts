//* Controlador del modulo, donde se definen las rutas y se llaman a los servicios
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import type { UpdateTaskDto } from './dto/update-task.dto.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/tasks')
@ApiTags('tasks')
export class TasksController {

    tasksService: TasksService;

    constructor( tasksService: TasksService ) {
        this.tasksService = tasksService;
    }

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: 200, description: 'List of tasks' })
    getAllTasks() {
        return this.tasksService.getTasks();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a task by id' })
    @ApiResponse({ status: 200, description: 'Task found' })
    getTask( @Param('id') id: string ) {
        return this.tasksService.getTask( parseInt(id) );
    }

    @Get('/message')
    @ApiOperation({ summary: 'Get a message' })
    @ApiResponse({ status: 200, description: 'Message' })
    getMessage() {
        return this.tasksService.getMessage();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'Task created' })
    createTask( @Body() task: CreateTaskDto ) {
        return this.tasksService.createTask(task);
    }

    @Put()
    @ApiOperation({ summary: 'Update a task' })
    @ApiResponse({ status: 200, description: 'Task updated' })
    updateTask(@Body() task: UpdateTaskDto) {
        return this.tasksService.updateTask(task);
    }

    @Delete()
    @ApiResponse({ status: 200, description: 'Task deleted' })
    @ApiOperation({ summary: 'Delete a task' })
    deleteTask() {
        return this.tasksService.deleteTask();
    }

    @Patch()
    @ApiResponse({ status: 200, description: 'Task status updated' })
    @ApiOperation({ summary: 'Update task status' })
    updateTaskStatus() {
        return this.tasksService.updateTaskStatus();
    }

}
