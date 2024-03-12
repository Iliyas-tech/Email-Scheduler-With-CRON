import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"

async function bootstrap() {
  dotenv.config({ 
    path: "./.env"
  }); 

  const app = await NestFactory.create(AppModule.forRoot(process.env.MONGO_CONNECTION_URI, process.env.DB_NAME));
  await app.listen(5010);
}
bootstrap();
