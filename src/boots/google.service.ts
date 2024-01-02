import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { PrismaService } from 'src/prisma/prisma.service';
import { BootInterface } from './interfaces/boot.interface';

export const enums = {
  Імя: 'name',
  Ціна: 'price',
  'Код товару': 'code',
};

@Injectable()
export class GoogleService {
  constructor(private prismaService: PrismaService) {}

  async getSpreadsheetsFirst() {
    const doc = new GoogleSpreadsheet(process.env.SPREED_ID, {
      apiKey: process.env.API_KEY,
    });

    await doc.loadInfo();
    const list: BootInterface[] = [];
    doc.sheetsByIndex.map(async (sheet, ind, arr) => {
      const dataArr = await sheet.getCellsInRange('A4:K30');
      dataArr.splice(3, 1);

      for (let i = 1; i < dataArr[0].length; i++) {
        const element: any = {};
        element.model = sheet.title;
        element.dimensions = [];
        dataArr.forEach((el: any) => {
          if (typeof +el[0] === 'number' && !isNaN(+el[0])) {
            if (el[i] === '+') element.dimensions.push(el[0]);
          } else {
            element[enums[el[0].trim()]] = el[i];
          }
        });
        list.push(element);
      }
      if (ind === arr.length - 1) {
        this.prismaService.hydrateDb(list);
      }
    });
    return { message: 'done' };
  }
}
