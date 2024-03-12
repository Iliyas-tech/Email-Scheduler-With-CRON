import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailSchedulerModule } from './email-scheduler/email-scheduler.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({})
export class AppModule {
  static forRoot(uri: string, db_name: string) {
    return {
      module: AppModule,
      imports: [
        MongooseModule.forRoot(uri, {
          dbName: db_name
        }),
        ScheduleModule.forRoot(),
        EmailSchedulerModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }
  }
}
