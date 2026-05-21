import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserMapper } from './user.mapper';
import { Admin } from 'src/common/decorators/admin.decorator';

@Injectable()
export class UsersService {
  private readonly USERS_CACHE_KEY = 'users';

  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}


  async getAll(filter?: string): Promise<UserDto[]> {
    let users = await this.cacheManager.get<UserDto[]>(this.USERS_CACHE_KEY);
    if (!users) {
      const results = await this.prisma.user.findMany({ orderBy: { display_name: 'asc' } });
      users = results.map(UserMapper.toUserDto);
      await this.cacheManager.set(this.USERS_CACHE_KEY, users, 300000);
    }

    if (!filter) {
      return users;
    }

    const normalizedFilter = filter.toLowerCase();
    return users.filter(
      (user) =>
        user.display_name.toLowerCase().includes(normalizedFilter) ||
        user.idir_username.toLowerCase().includes(normalizedFilter) ||
        user.role.toLowerCase().includes(normalizedFilter),
    );
  }

  async getByIdirUserName(idirUsername: string): Promise<UserDto | null> {
    const cacheKey = `${this.USERS_CACHE_KEY}:${idirUsername.toLowerCase()}`;
    const cached = await this.cacheManager.get<UserDto>(cacheKey);
    if (cached) {
      return cached;
    }

    const user = await this.prisma.user.findUnique({ where: { idir_username: idirUsername } });
    if (!user) {
      return null;
    }

    const dto = UserMapper.toUserDto(user);
    await this.cacheManager.set(cacheKey, dto, 300000);
    return dto;
  }


  async upsert(dto: CreateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.upsert({
      where: { idir_username: dto.idir_username },
      create: {
        idir_username: dto.idir_username,
        display_name: dto.display_name,
        app_role: dto.role,
        is_active: dto.is_active,
      },
      update: {
        display_name: dto.display_name,
        app_role: dto.role,
        is_active: dto.is_active,
      },
    });

    await this.invalidateCache(dto.idir_username);
    return UserMapper.toUserDto(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: id as any } });
    if (!user) {
      return;
    }

    await this.prisma.user.delete({ where: { id: id as any } });
    await this.invalidateCache(user.idir_username);
  }

  private async invalidateCache(idirUsername?: string): Promise<void> {
    await this.cacheManager.del(this.USERS_CACHE_KEY);
    if (idirUsername) {
      await this.cacheManager.del(`${this.USERS_CACHE_KEY}:${idirUsername.toLowerCase()}`);
    }
  }
}
