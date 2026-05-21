import { Prisma, User as PrismaUser } from '@prisma/client';
import { UserDto } from './dto/user.dto';

export class UserMapper {
  static toUserDto(user: PrismaUser): UserDto {
    return {
      id: Number(user.id),
      idir_username: user.idir_username,
      display_name: user.display_name,
      role: user.app_role,
      is_active: user.is_active,
    };
  }

  static toUser(dto: UserDto): Prisma.UserCreateInput {
    return {
      idir_username: dto.idir_username,
      display_name: dto.display_name,
      app_role: dto.role,
      is_active: dto.is_active,
    };
  }
}
