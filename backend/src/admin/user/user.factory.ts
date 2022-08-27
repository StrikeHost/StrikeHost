import Faker, { random } from 'faker';
import { define } from 'typeorm-seeding';

import { User } from 'src/user/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.first_name = faker.name.firstName();
  user.last_name = faker.name.lastName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.admin = random.boolean();
  return user;
});
