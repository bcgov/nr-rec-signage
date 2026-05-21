import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserDto extends PickType(UserDto, [
  'idir_username',
  'display_name',
  'role',
  'is_active',
] as const) {}
