import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { InstanceRepository } from 'src/instance/instance.repository';
import { AgentRepository } from './agent.repository';
import { AgentService } from './agent.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgentRepository, InstanceRepository]),
    AuthModule,
  ],
  exports: [AgentService],
  providers: [AgentService],
})
export class AgentModule {}
