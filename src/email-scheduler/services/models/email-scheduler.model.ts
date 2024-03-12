import mongoose, { Schema } from "mongoose"
import { EmailStatusEnum } from "../enum/email-status.enum"

export interface IEmailScheduler extends mongoose.Document {
    from: string;
    receipients: string[];
    body: string;
    subject: string;
    scheduledAt: Date;
    status: string;
}
export const EmailSchedulerSchema = new Schema(
    {
        from: { type: String, required: true },
        receipients: { type: [String], required: true },
        subject: { type: String, required: true },
        body: { type: String, required: true},
        scheduledAt: { type: Date, required: true},
        status: { type: String, enum: Object.values(EmailStatusEnum), default: EmailStatusEnum.SCHEDULED}
    },
    {
        timestamps: true
    }
)

export const EmailScheduler = mongoose.model<IEmailScheduler>("EmailScheduler", EmailSchedulerSchema)