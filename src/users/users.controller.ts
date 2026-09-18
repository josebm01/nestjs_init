import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Controller('/users')
export class UsersController {

    // Inyectamos el servicio de UsersService en el controlador
    // Forma más simple
    constructor( private UsersService: UsersService ) {}

    @Get()
    getAllUsers() {
        return this.UsersService.getUsers();
    }

    @Post()
    createUser( @Body() user: CreateUserDto ) {
        return this.UsersService.createUser(user);
    }

}
