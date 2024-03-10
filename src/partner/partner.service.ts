import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PartnerDTO } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartnerService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async getPartners(adminId: number) {
    console.log(adminId);

    return await this.prismaService.partner.findMany({
      where: {
        status: true,
      },
    });
  }

  async getPartnerById(adminId: number, partnerId: number) {
    console.log(adminId, partnerId);

    const partner = await this.prismaService.partner.findUnique({
      where: {
        id: partnerId,
        status: true,
      },
    });

    if (!partner) {
      throw new NotFoundException('Partner not found');
    }

    return partner;
  }

  async createPartner(adminId: number, partner: PartnerDTO) {
    console.log(adminId, partner);

    return await this.prismaService.partner.create({
      data: {
        ...partner,
      },
    });
  }

  async updatePartner(adminId: number, partnerId: number, partner: PartnerDTO) {
    console.log(adminId, partnerId, partner);

    const partnerExist = await this.prismaService.partner.findUnique({
      where: {
        id: partnerId,
      },
    });

    if (!partnerExist) {
      throw new NotFoundException('Partner not found');
    }

    return await this.prismaService.partner.update({
      where: {
        id: partnerId,
      },
      data: {
        ...partner,
      },
    });
  }

  async deletePartner(adminId: number, partnerId: number) {
    console.log(adminId, partnerId);

    const partnerExist = await this.prismaService.partner.findUnique({
      where: {
        id: partnerId,
      },
    });

    if (!partnerExist) {
      throw new NotFoundException('Partner not found');
    }

    return await this.prismaService.partner.update({
      where: {
        id: partnerId,
      },
      data: {
        status: false,
      },
    });
  }
}
