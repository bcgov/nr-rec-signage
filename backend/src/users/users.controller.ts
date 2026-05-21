import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Admin } from '../common/decorators/admin.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('auth')
@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get('authenticate')
  async authenticate(@Req() req: any): Promise<UserDto> {
    const currentUser = req.currentUser;
    if (!currentUser) {
      throw new Error('User not found in request');
    }
    return currentUser;
  }

  @Get('users')
  @Admin()
  async getAll(@Query('filter') filter?: string): Promise<UserDto[]> {
    return this.usersService.getAll(filter);
  }

  @Post('users')
  @Admin()
  async upsert(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.usersService.upsert(dto);
  }

  @Delete('users/:id')
  @Admin()
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(Number(id));
  }
}
