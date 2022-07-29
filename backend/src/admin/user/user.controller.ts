import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ResourceAllocationService } from 'src/resource-allocation/resource-allocation.service';
import { CreateResourceAllocationDTO } from './dto/create-resource-allocation.dto';
import { UserService } from './user.service';

@Controller('admin/user')
@UseGuards(AdminGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private resourceAllocationService: ResourceAllocationService,
  ) {}

  @Get()
  async GetUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/:userId')
  async GetUser(@Param('userId') userId: string) {
    return await this.userService.getUser(userId, [
      'instances',
      'instances.image',
      'resource_allocations',
      'resource_allocations.instance',
    ]);
  }

  @Get('/:userId/resource')
  async GetUserResourceAllocations(
    @Param('skip') skip: number,
    @Param('userId') userId: string,
  ) {
    return await this.resourceAllocationService.getAllUserAllocations(
      userId,
      skip,
    );
  }

  @Post('/:userId/resource')
  async AllocateUserResource(
    @Param('userId') userId: string,
    @Body() createAllocationDto: CreateResourceAllocationDTO,
  ) {
    const allocation =
      await this.resourceAllocationService.allocateUserResource(
        userId,
        createAllocationDto,
      );

    return allocation;
  }

  @Post('/:userId/delete')
  async DeleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
