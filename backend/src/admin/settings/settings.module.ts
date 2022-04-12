import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingModule as RootSettingModule } from 'src/setting/setting.module';

@Module({
  imports: [RootSettingModule],
  controllers: [SettingsController],
})
export class SettingsModule {}
