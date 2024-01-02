import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { EditNameDto } from 'src/boots/dtos/editName.dto';
import { BootInterface } from 'src/boots/interfaces/boot.interface';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: { url: config.get('DATABASE_URL') },
      },
    });
  }

  async hydrateDb(data: BootInterface[]): Promise<void> {
    const list: BootInterface[] = await this.getAll();
    if (list.length > 0) {
      data.forEach(async (element: BootInterface) => {
        await this.boot.upsert({
          where: { name: element.name },
          update: { dimensions: element.dimensions },
          create: { ...element },
        });
      });
    } else {
      await this.boot.createMany({ data });
    }
  }

  getAll(): Promise<BootInterface[]> {
    return this.boot.findMany();
  }

  async getOne(id: number): Promise<BootInterface> {
    const data: BootInterface = await this.boot.findFirst({ where: { id } });

    if (!data) {
      throw new BadRequestException();
    }

    return data;
  }

  getByDimension(dimension: string): Promise<BootInterface[]> {
    return this.boot.findMany({
      where: {
        dimensions: { has: dimension },
      },
    });
  }

  async editName(id: number, body: EditNameDto): Promise<BootInterface> {
    const data: BootInterface = await this.getOne(id);

    if (!data) {
      throw new BadRequestException();
    }

    return this.boot.update({ where: { id }, data: { ...body } });
  }
}
