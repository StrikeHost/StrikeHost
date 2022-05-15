import { IsEnum, IsString } from 'class-validator';

import { InstanceStatusType } from '../enum/InstanceStatusType';

export class InstanceStateChangeDto {
  @IsString()
  instanceId: string;

  @IsEnum(InstanceStatusType)
  status: InstanceStatusType;
}
