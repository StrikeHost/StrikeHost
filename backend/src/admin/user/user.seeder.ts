import { User } from 'src/user/user.entity';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

export default class UserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(10);
  }
}
