import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { GoogleService } from './google.service';

@Injectable()
export class BootsService {
  constructor(private googleService: GoogleService) {}

  @Timeout(1000)
  async getSpreadsheetsFirst() {
    const obj = await this.googleService.getSpreadsheetsFirst();
    console.log(obj);
  }

  @Cron(CronExpression.EVERY_HOUR)
  getSpreadsheets() {
    console.log('1 hour');
  }
}
