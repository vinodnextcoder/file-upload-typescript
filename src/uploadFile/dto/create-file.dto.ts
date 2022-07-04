import { IsNotEmpty } from 'class-validator';
export class CreatefileDto {
  @IsNotEmpty()
  readonly originalName: string;
  @IsNotEmpty()
  readonly size: number;
  
  @IsNotEmpty()
  readonly filedName: string;

  @IsNotEmpty()
  readonly fileType: string;

  @IsNotEmpty()
  readonly uniqueId: string;
}

