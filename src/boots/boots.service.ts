import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { GoogleService } from './google.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditNameDto } from './dtos/editName.dto';
import { BootInterface } from './interfaces/boot.interface';

@Injectable()
export class BootsService {
  constructor(
    private googleService: GoogleService,
    private prismaService: PrismaService,
  ) {}

  @Timeout(0)
  async getSpreadsheetsFirst() {
    await this.googleService.getSpreadsheetsFirst();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async getSpreadsheets() {
    await this.googleService.getSpreadsheetsFirst();
  }

  getAll(): Promise<BootInterface[]> {
    return this.prismaService.getAll();
  }

  getOne(id: number): Promise<BootInterface> {
    return this.prismaService.getOne(id);
  }

  getByDimension(dimension: string): Promise<BootInterface[]> {
    return this.prismaService.getByDimension(dimension);
  }

  editName(id: number, body: EditNameDto): Promise<BootInterface> {
    return this.prismaService.editName(id, body);
  }
}
