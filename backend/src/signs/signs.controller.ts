import { Controller, Get, Post, Put, Delete, Param, Body, Query, Req, ForbiddenException } from '@nestjs/common';
import { SignsService } from './signs.service';
import { SignMapper } from './mapper/sign.mapper';
import { SignCreationDto } from './dto/sign-creation.dto';
import { SignUpdateDto } from './dto/sign-update.dto';
import { SignApprovalDto } from './dto/sign-approval.dto';
import { SignListDto } from './dto/sign-list.dto';

@Controller('signs')
export class SignsController {
  constructor(private readonly signsService: SignsService) {}

  @Get()
  async getSigns(
    @Req() req: any,
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Query('view') view: string = 'user_view',
    @Query('dateStart') dateStart?: string,
    @Query('dateEnd') dateEnd?: string,
    @Query('categoryId') categoryId?: string
  ): Promise<SignListDto> {
    const idUserGuid = req.user?.idir_user_guid;
    const categoryIds = categoryId
      ? categoryId.split(',').map(Number).filter(n => !Number.isNaN(n))
      : undefined;

    const useAdminView = req.hasAdminRole && view === 'admin_view';

    if (!useAdminView && !idUserGuid) {
      throw new Error('User GUID not found in token');
    }

    const pageNumber = Math.max(1, Number(page) || 1);
    const take = +limit || 20;
    const skip = (pageNumber - 1) * take;

    const result = await this.signsService.getAll(
      useAdminView ? undefined : idUserGuid,
      take,
      skip,
      dateStart,
      dateEnd,
      categoryIds
    );

    return {
      total: result.total,
      signs: result.signs.map(sign => SignMapper.toSignDetailsDto(sign)),
    };
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

  @Post('approve')
  async approve(@Body() approvals: SignApprovalDto[], @Req() req: any) {
    if (!req.hasAdminRole) {
      throw new ForbiddenException('Admin role required');
    }
    const signs = approvals.map(approval => SignMapper.signApprovalDtoToSign(approval));
    await this.signsService.approve(signs);
    return { status: 200 };
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    if (!req.hasAdminRole) {
      throw new ForbiddenException('Admin role required');
    }
    await this.signsService.delete(+id);
    return { status: 200 };
  }

  @Post(':id/save-library')
  async saveToLibrary(@Param('id') id: string, @Req() req: any) {
    const idirUserGuid = req.user?.idir_user_guid;
    if (!idirUserGuid) {
      throw new Error('User GUID not found in token');
    }
    await this.signsService.saveToLibrary(+id);
    return { status: 200 };
  }

  @Post('duplicate/:id')
  async duplicate(@Param('id') id: string, @Req() req: any) {
    const idirUserGuid = req.user?.idir_user_guid;
    const displayName = req.user?.name || req.user?.preferred_username || 'Unknown';
    if (!idirUserGuid) {
      throw new Error('User GUID not found in token');
    }
    return this.signsService.duplicate(+id, idirUserGuid, displayName);
  }

  @Post('reset/:id')
  async reset(@Param('id') id: string, @Req() req: any) {
    const idirUserGuid = req.user?.idir_user_guid;
    if (!idirUserGuid) {
      throw new Error('User GUID not found in token');
    }
    return this.signsService.reset(+id,idirUserGuid);
  }

  @Put()
  async update(@Body() dto: SignUpdateDto) {
    const sign = SignMapper.toSignUpdate(dto);
    await this.signsService.update(sign);
    return { status: 200 };
  }
}
