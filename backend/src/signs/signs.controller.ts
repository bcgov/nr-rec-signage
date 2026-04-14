import { Controller, Get, Post, Put, Param, Body, Query, Req } from '@nestjs/common';
import { SignsService } from './signs.service';
import { SignMapper } from './mapper/sign.mapper';
import { SignCreationDto } from './dto/sign-creation.dto';
import { SignUpdateDto } from './dto/sign-update.dto';

@Controller('signs')
export class SignsController {
  constructor(private readonly signsService: SignsService) {}

  @Get()
  async getSigns(@Query('limit') limit: string, @Req() req: any) {
    const idUserGuid = req.user?.idir_user_guid;
    if (!idUserGuid) {
      throw new Error('User GUID not found in token');
    }
    const signs = await this.signsService.getAll(idUserGuid, +limit || 20);
    return signs.map(sign => SignMapper.toSignDetailsDto(sign));
  }

  @Get(':id')
  async getSign(@Param('id') id: string) {
    const sign = await this.signsService.getSign(+id);
    return SignMapper.toSignDetailsDto(sign);
  }

  @Post()
  async insert(@Body() dto: SignCreationDto, @Req() req: any) {
    console.log('Received sign creation request:', dto);
    const idirUserGuid = req.user?.idir_user_guid;
    const displayName = req.user?.name || req.user?.preferred_username || 'Unknown';
    if (!idirUserGuid) {
      throw new Error('User GUID not found in token');
    }
    const sign = SignMapper.toSign(dto, idirUserGuid, displayName);
    return this.signsService.insert(sign);
  }

  @Put()
  async update(@Body() dto: SignUpdateDto) {
    const sign = SignMapper.toSignUpdate(dto);
    await this.signsService.update(sign);
    return { status: 200 };
  }
}
