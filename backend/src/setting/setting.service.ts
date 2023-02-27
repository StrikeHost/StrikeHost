import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './setting.entity';
import { SettingRepository } from './setting.repository';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SettingRepository)
    private settingRepository: SettingRepository,
  ) {}

  /**
   * Get all settings
   *
   * @returns {Promise<Setting[]>}
   */
  async getAllSettings(): Promise<Setting[]> {
    return await this.settingRepository.find();
  }

  /**
   * Updates a setting
   *
   * @param {string} settingName
   * @param {string} value
   * @returns {Promise<Setting>}
   */
  async updateSetting(settingName: string, value: string): Promise<Setting> {
    const setting = await this.settingRepository.findOne(settingName);

    if (!setting) {
      throw new NotFoundException('Setting not found');
    }

    setting.value = value;
    await setting.save();

    return setting;
  }
}
