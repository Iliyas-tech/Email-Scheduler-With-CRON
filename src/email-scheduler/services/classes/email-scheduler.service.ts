import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IEmailScheduler } from "../models/email-scheduler.model";
import { Model } from "mongoose";
import { Cron, CronExpression } from "@nestjs/schedule"
import { EmailStatusEnum } from "../enum/email-status.enum";
import { SendgridService } from "src/common/sendgrid/sendgrid.service";

@Injectable()
export class EmailSchedulerService {
    constructor(@InjectModel('EmailScheduler') private readonly EmailSchedulerModel: Model<IEmailScheduler>,
    private readonly SendgridService: SendgridService) {}

    @Cron(CronExpression.EVERY_MINUTE, { name: 'EmailScheduler' })
    async handleCronForEmailTriggers() {
        console.log("Hi I'll be get called every Minute");
        //Fetch all email schedulers which are SCHEDULED
        const scheduledEmailsList = await this.scheduledEmailList(new Date());

        // console.log(scheduledEmailsList)
        if (scheduledEmailsList && scheduledEmailsList.length > 0) {
            for (const document of scheduledEmailsList) {
                try {
                    await this.SendgridService.triggerEmail(document)

                    //Update to status "DELIVERED"
                    await this.EmailSchedulerModel.findByIdAndUpdate(document._id, {
                        $set: {
                            status: EmailStatusEnum.DELIVERED
                        }
                    })
                }
                catch(error) {
                    console.log("error on sendgrid service", error)
                }
            }
        }
        
    }


    async scheduleEmail(emailSchedulerPayload: IEmailScheduler): Promise<IEmailScheduler> {
        const newEmailScheduler = new this.EmailSchedulerModel(emailSchedulerPayload);
        return await newEmailScheduler.save();
    }

    private async scheduledEmailList(currentTime): Promise<IEmailScheduler[]> {
        try {
            // console.log("time now", currentTime)

            // Calculate the start and end of the current minute
            const currentMinuteStart = new Date(currentTime);
            currentMinuteStart.setSeconds(0);
            currentMinuteStart.setMilliseconds(0);

            const currentMinuteEnd = new Date(currentMinuteStart);
            currentMinuteEnd.setMinutes(currentMinuteStart.getMinutes() + 1);


            const query = this.EmailSchedulerModel.find({ 
                status: EmailStatusEnum.SCHEDULED,
                scheduledAt: {
                    $gte: currentMinuteStart,
                    $lt: currentMinuteEnd
                }
            })
            // console.log("DB Query", query.getQuery());

            //Execute
            const emailList = await query.exec();

            return Promise.resolve(emailList);
        }
        catch(error) {
            console.log("error while retrieving scheduledEmailList", error)
            return Promise.reject(error);
        }
    }
}