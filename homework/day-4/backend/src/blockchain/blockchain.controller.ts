import { Controller, Get } from "@nestjs/common";
import { BlockchainService } from "./blockchain.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Blockchain")
@Controller("blockchain")
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get("value")
  @ApiOperation({ summary: "Get latest value from smart contract" })
  async getValue() {
    return this.blockchainService.getLatestValue();
  }

  @Get("events")
  @ApiOperation({ summary: "Get ValueUpdated event history" })
  async getEvents() {
    return this.blockchainService.getValueUpdatedEvents();
  }
}
