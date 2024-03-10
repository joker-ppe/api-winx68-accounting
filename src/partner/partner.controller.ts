import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MyJwtGuard } from 'src/auth/guard';
import { GetAdmin } from 'src/auth/decorator';
import { PartnerDTO } from 'src/auth/dto';

@UseGuards(MyJwtGuard)
@ApiTags('Partner')
@ApiBearerAuth()
@Controller('partner')
export class PartnerController {
  constructor(private partnerService: PartnerService) {}

  @Get()
  getPartners(@GetAdmin('id') adminId: number) {
    console.log({
      request: 'getAllPartners',
      adminId: adminId,
      at: new Date().toISOString(),
    });

    return this.partnerService.getPartners(adminId);
  }

  @Get('id/:id')
  getPartnerById(
    @GetAdmin('id') adminId: number,
    @Param('id', ParseIntPipe) partnerId: number,
  ) {
    console.log({
      request: `getPartnerById: ${partnerId}`,
      adminId: adminId,
      at: new Date().toISOString(),
    });

    return this.partnerService.getPartnerById(adminId, partnerId);
  }

  @Post()
  createPartner(@GetAdmin('id') adminId: number, @Body() partner: PartnerDTO) {
    console.log({
      request: 'createPartner',
      adminId: adminId,
      partner: partner,
      at: new Date().toISOString(),
    });

    return this.partnerService.createPartner(adminId, partner);
  }

  @Put('id/:id')
  updatePartner(
    @GetAdmin('id') adminId: number,
    @Param('id', ParseIntPipe) partnerId: number,
    @Body() partner: PartnerDTO,
  ) {
    console.log({
      request: `updatePartner: ${partnerId}`,
      adminId: adminId,
      partner: partner,
      at: new Date().toISOString(),
    });

    return this.partnerService.updatePartner(adminId, partnerId, partner);
  }

  @Delete('id/:id')
  deletePartner(
    @GetAdmin('id') adminId: number,
    @Param('id', ParseIntPipe) partnerId: number,
  ) {
    console.log({
      request: `deletePartner: ${partnerId}`,
      adminId: adminId,
      at: new Date().toISOString(),
    });

    return this.partnerService.deletePartner(adminId, partnerId);
  }
}
