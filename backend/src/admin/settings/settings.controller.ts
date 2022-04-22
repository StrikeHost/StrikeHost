import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { SettingService } from 'src/setting/setting.service';

@Controller('admin/settings')
@UseGuards(AdminGuard)
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
