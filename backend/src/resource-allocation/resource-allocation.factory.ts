import Faker, { random } from 'faker';
import { define } from 'typeorm-seeding';

import { ResourceAllocation } from './resource-allocation.entity';

define(ResourceAllocation, (faker: typeof Faker) => {
  const resourceAllocation = new ResourceAllocation();
  resourceAllocation.cpus = random.number({ min: 1, max: 4 });
  resourceAllocation.memory = random.number({ min: 1024, max: 4096 });
  resourceAllocation.storage = random.number({ min: 30, max: 100 });
  return resourceAllocation;
});
