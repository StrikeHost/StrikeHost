import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginExpress from '@bugsnag/plugin-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'development') {
    Bugsnag.start({
      apiKey: '0f1fb96b2e05419fbc9b7cd03c9f3b97',
      plugins: [BugsnagPluginExpress],
    });

    app.use(Bugsnag.getPlugin('express').errorHandler);
  }

  await app.listen(3000);
}
bootstrap();
