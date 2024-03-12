import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EmailSchedulerService } from '../services/classes/email-scheduler.service';
import { IEmailScheduler } from '../services/models/email-scheduler.model';


@Controller('email-scheduler')
export class EmailSchedulerController {
  constructor(private readonly emailSchedulerService: EmailSchedulerService) {}

  @Post('/create')
  async create(@Body() data: IEmailScheduler) {
    return await this.emailSchedulerService.scheduleEmail(data);
  }
}