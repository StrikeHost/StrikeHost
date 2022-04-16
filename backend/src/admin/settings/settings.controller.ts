import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SettingService } from 'src/setting/setting.service';

@Controller('admin/settings')
export class SettingsController {
  constructor(private settingsService: SettingService) {}

  @Get()
  async GetSettings() {
    const settings = await this.settingsService.getAllSettings();
    return settings;
  }

  @Post(':settingName')
  async UpdateSetting(
    @Param('settingName') settingName: string,
    @Body('value') value: string,
  ) {
    const setting = await this.settingsService.updateSetting(
      settingName,
      value,
    );
    return setting;
  }
}
