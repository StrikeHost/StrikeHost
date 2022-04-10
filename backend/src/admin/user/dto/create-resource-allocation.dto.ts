import { IsNumber } from 'class-validator';

export class CreateResourceAllocationDTO {
  @IsNumber()
  memory: number;

  @IsNumber()
  storage: number;
}
