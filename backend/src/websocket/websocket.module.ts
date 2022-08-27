import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstanceRepository } from 'src/instance/instance.repository';
import { WebsocketService } from './websocket.service';

@Module({
  imports: [TypeOrmModule.forFeature([InstanceRepository])],
  providers: [WebsocketService],
  exports: [WebsocketService],
})
export class WebsocketModule {}
