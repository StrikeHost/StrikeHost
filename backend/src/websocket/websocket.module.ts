import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';

@Module({
  providers: [WebsocketService]
})
export class WebsocketModule {}
