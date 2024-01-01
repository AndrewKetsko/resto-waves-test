import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { EditNameDto } from 'src/boots/dtos/editName.dto';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: { url: config.get('DATABASE_URL') },
      },
    });
  }

  async hydrateDb(data) {
    await this.boot.deleteMany();
    await this.boot.createMany({ data });
  }

  getAll() {
    return this.boot.findMany();
  }

  async getOne(id: number) {
    const data = await this.boot.findFirst({ where: { id } });

    if (!data) {
      throw new BadRequestException();
    }

    return data;
  }

  getByDimension(dimension: number) {
    return this.boot.findMany({
      where: {
        dimensions: { has: dimension },
      },
    });
  }

  async editName(id: number, body: EditNameDto) {
    const data = await this.getOne(id);

    if (!data) {
      throw new BadRequestException();
    }

    return this.boot.update({ where: { id }, data: { ...body } });
  }
}
