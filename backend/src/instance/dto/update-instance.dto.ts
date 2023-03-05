import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateInstanceDto {
  @IsBoolean()
  @IsOptional()
  is_backups_enabled: boolean;
}
