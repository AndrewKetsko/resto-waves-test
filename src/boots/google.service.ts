import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { PrismaService } from 'src/prisma/prisma.service';

export const enums = {
  Імя: 'name',
  Ціна: 'price',
  'Код товару': 'code',
};

@Injectable()
export class GoogleService {
  private list: any[] = [];
  constructor(private prismaService: PrismaService) {}

  async getSpreadsheetsFirst() {
    const doc = new GoogleSpreadsheet(process.env.SPREED_ID, {
      apiKey: process.env.API_KEY,
    });

    await doc.loadInfo();
    const list = [];
    doc.sheetsByIndex.map(async (sheet, ind, arr) => {
      const dataArr = async () => await sheet.getCellsInRange('A4:K30');
      const data = await dataArr();
      data.splice(3, 1);

      for (let i = 1; i < data[0].length; i++) {
        const element: any = {};
        element.model = sheet.title;
        element.dimensions = [];
        data.forEach((el: any) => {
          if (typeof +el[0] === 'number' && !isNaN(+el[0])) {
            if (el[i] === '+') element.dimensions.push(+el[0]);
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
