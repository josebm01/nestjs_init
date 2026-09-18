//* Funciones que se pueden reutilizar dentro del modulo
import { NotFoundException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/index.js";
import { CreateTaskDto } from "./dto/create-task.dto.js";
import { UpdateTaskDto } from "./dto/update-task.dto.js";

export interface Task {
    name: string;
    description: string;  
}

@Injectable({})
export class TasksService {

    private tasks: any = [];

    getMessage(){
        return 'Filtrando tareas...'
    }

    getTask(id: number) {
        const result = this.tasks.find((task: any) => task.id === id);

        if( !result ) {
            return new NotFoundException(`Task with id ${id} not found`);
        }

        return result;

    }

    getTasks() {
        return this.tasks;
    }

    createTask(task: CreateTaskDto) {

        this.tasks.push({
            ...task,
            id: this.tasks.length + 1,
        });

        return {
            message: 'Tarea creada',
            task: task
        };
    }    

    updateTask(task: UpdateTaskDto) {
        return 'Tarea actualizada';
    }
    
    deleteTask() {
        return 'Tarea eliminada';
    }
    
    updateTaskStatus() {
        return 'Actualizado el estado de la tarea';
    }
}