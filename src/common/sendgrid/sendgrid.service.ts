import { Injectable } from "@nestjs/common"
import sgMail from "@sendgrid/mail"

@Injectable()
export class SendgridService {

    async triggerEmail(payload): Promise<void> {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const { from, receipients, body, subject } = payload;
        const msg = {
            to: receipients[0],
            from: from,
            subject: subject,
            text: body,
        }
        try {
            await sgMail.send(msg)
            console.log("Email Sent Succesfully")
        }
        catch(error) {
            console.log("error while sending email", error)
        }
    }
}