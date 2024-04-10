import { Controller, Get, Ip, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyRequest } from 'fastify';

/**
 * Application controller
 *
 * - getHealth() returns a string with the server status
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(@Req() request: FastifyRequest, @Ip() ip: string): string {
    return this.appService.getHealth(request?.url, ip);
  }
}
