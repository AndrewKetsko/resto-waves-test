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

  // cleanDb() {
  //   return this.$transaction([this.boot.deleteMany()]);
  // }

  async hydrateDb(data) {
    await this.boot.deleteMany();
    await this.boot.createMany({ data });
  }

  getAll() {
    return this.boot.findMany();
  }

  getOne(id: number) {
    return this.boot.findFirst({ where: { id } });
  }

  getByDimension(dimension: string) {
    return this.boot.findMany({
      where: {
        dimensions: { has: 39 },
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
