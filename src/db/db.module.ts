import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [],
})
export class DatabaseModule {
    constructor() {
        try {
            MongooseModule.forRootAsync({
                useFactory: () => ({
                    uri: `${process.env.MONGO_CONNECTION_URI}/hr-ascent`,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
            });
        } catch (error) {
            console.log(error);
        }
    }
}
