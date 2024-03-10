import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userName: string;

  // @IsEmail()
  // @IsOptional()
  // @ApiProperty()
  // email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class PartnerDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nickName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  threshold: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  groupId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}
