import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class UsersService {

    constructor( private prisma: PrismaService) {}

    getUsers() {
        return this.prisma.db.orm.public.User.all();
    }

    createUser( user: CreateUserDto) {
        return this.prisma.db.orm.public.User.create(user);
    }

}
