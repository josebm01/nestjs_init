import { Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Query, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ValidateUserPipe } from './pipes/validate-user/validate-user.pipe.js';
import { AuthGuard } from './guards/auth/auth.guard.js';

@Controller()
export class InitController {
    //* Se ejecuta cuando se hace una petición GET a la ruta raíz del servidor
    @Get('/')
    index( @Req() request: Request, @Res() response: Response ) {
        
        response.status(200).json({
            message: 'Welcome to my app',
            status: 'success',
            timestamp: new Date().toISOString(),
        });

    }

    @Get('/health')
    health() {
        return {
            message: 'Service is running',
            status: 'success',
            timestamp: new Date().toISOString(),
        };
    }

    //* Codigos de estado HTTP
    @Get('new')
    @HttpCode(201)
    new() {
        return {
            message: 'Resource created',
            status: 'success',
            timestamp: new Date().toISOString(),
        };
    }

    @Get('not-found')
    @HttpCode(404)
    notFound() {
        return {
            message: 'Resource not found',
            status: 'error',
            timestamp: new Date().toISOString(),
        };
    }

    @Get('error')
    @HttpCode(500)
    error() {
        return {
            message: 'Internal server error',
            status: 'error',
            timestamp: new Date().toISOString(),
        };
    }

    //* Pipes
    // ParseIntPipe
    @Get('ticket/:num')
    getNumber( @Param('num', ParseIntPipe) num: number ) {
        return num + 14;
    }

    // ParseBoolPipe
    @Get('active/:status')
    isUserActive( @Param('status', ParseBoolPipe) status: boolean ) {
        return status
    }

    // Pipe personalizado para procesar datos
    @Get('greet')
    @UseGuards(AuthGuard)
    greet( @Query(ValidateUserPipe) query: {name: string, age: number} ) {
        return `Hello ${query.name}, you are ${query.age} years old`;
    }
}
