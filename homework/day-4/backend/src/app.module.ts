import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { BlockchainModule } from "./blockchain/blockchain.module";

@Module({
  imports: [BlockchainModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
