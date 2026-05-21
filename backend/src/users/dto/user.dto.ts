import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiPropertyOptional({
    description: 'The ID of the user',
  })
  id?: number;

  @ApiProperty({
    description: 'The IDIR username of the user',
  })
  idir_username: string;

  @ApiProperty({
    description: 'The display name of the user',
  })
  display_name: string;

  @ApiProperty({
    description: 'The role of the user',
  })
  role: string;

  @ApiProperty({
    description: 'Indicates whether the user is active',
    default: true,
  })
  is_active: boolean;
}
