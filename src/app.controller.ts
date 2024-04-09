import { Controller, Get, Ip, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyRequest } from 'fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(@Req() request: FastifyRequest, @Ip() ip: string): string {
    return this.appService.getHealth(request?.url, ip);
  }
}
