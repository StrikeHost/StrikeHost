import { User } from 'src/user/user.entity';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

import { ResourceAllocation } from './resource-allocation.entity';

export default class ResourceAllocationSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const user = await factory(User)().create({
      admin: true,
      email: 'me@sgunner.me',
      password: 'password',
    });

    await factory(ResourceAllocation)().create({
      user,
    });
  }
}
