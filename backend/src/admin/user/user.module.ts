import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceAllocationModule } from 'src/resource-allocation/resource-allocation.module';
import { UserRepository } from 'src/user/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    ResourceAllocationModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
