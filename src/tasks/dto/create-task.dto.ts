//* Data Transfer Object (DTO)
//* Estructura de datos que se espera recibir al crear una tarea

import { 
    IsString, 
    MinLength,
} from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MinLength(1)
    name: string;
    
    @IsString()
    @MinLength(1)
    description: string;
}