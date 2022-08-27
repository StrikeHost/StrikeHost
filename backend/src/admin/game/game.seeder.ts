import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

import { Game } from 'src/game/game.entity';
import { Image } from 'src/image/image.entity';
import { ImageVersion } from 'src/image-version/image-version.entity';

export default class GameSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const game = new Game();
    game.name = 'Minecraft';
    game.slug = 'minecraft';
    game.images = [];
    await game.save();

    const image = new Image();
    image.game = game;
    image.name = 'Vanilla';
    image.docker_name = 'sgunner2017/minecraft';
    await image.save();

    const imageVersion = new ImageVersion();
    imageVersion.image = image;
    imageVersion.arguments = {};
    imageVersion.name = '1.12.2';
    await image.save();

    game.images = [image];
    await game.save();

    image.versions = [imageVersion];
    await image.save();
  }
}
