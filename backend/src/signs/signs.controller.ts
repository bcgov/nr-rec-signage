import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { SignsService } from './signs.service';
import { SignMapper } from './mapper/sign.mapper';
import { SignCreationDto } from './dto/sign-creation.dto';
import { SignUpdateDto } from './dto/sign-update.dto';

@Controller('signs')
export class SignsController {
  constructor(private readonly signsService: SignsService) {}

  @Get(':id')
  async getSign(@Param('id') id: string) {
    const sign = await this.signsService.getSign(+id);
    return SignMapper.toSignDetailsDto(sign);
  }

  @Post()
  async insert(@Body() dto: SignCreationDto) {
    console.log('Received sign creation request:', dto);
    const sign = SignMapper.toSign(dto);
    return this.signsService.insert(sign);
  }

  @Put()
  async update(@Body() dto: SignUpdateDto) {
    const sign = SignMapper.toSignUpdate(dto);
    await this.signsService.update(sign);
    return { status: 200 };
  }
}
