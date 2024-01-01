import { IsString } from 'class-validator';

export class EditNameDto {
  @IsString()
  name: string;
}
