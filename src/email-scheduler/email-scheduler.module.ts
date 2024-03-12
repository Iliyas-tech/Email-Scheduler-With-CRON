import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSchedulerSchema } from './services/models/email-scheduler.model';
import { EmailSchedulerController } from './controllers/email-scheduler.controller';
import { EmailSchedulerService } from './services/classes/email-scheduler.service';
import { SendgridService } from 'src/common/sendgrid/sendgrid.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'EmailScheduler', schema: EmailSchedulerSchema }])
  ],
  controllers: [EmailSchedulerController],
  providers: [EmailSchedulerService, SendgridService],
})
export class EmailSchedulerModule {}
