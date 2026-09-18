import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/users')
export class UsersController {

    // Inyectamos el servicio de UsersService en el controlador
    // Forma más simple
    constructor( private UsersService: UsersService ) {}

    @ApiTags('users')
    @ApiOperation({ summary: 'Get all users' })
    @Get()
    getAllUsers() {
        return this.UsersService.getUsers();
    }

    @ApiOperation({ summary: 'Create a new user' })
    @Post()
    createUser( @Body() user: CreateUserDto ) {
        return this.UsersService.createUser(user);
    }

}
