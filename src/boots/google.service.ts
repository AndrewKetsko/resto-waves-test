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
  constructor(private prismaService: PrismaService) {}

  async getSpreadsheetsFirst() {
    const doc = new GoogleSpreadsheet(process.env.SPREED_ID, {
      apiKey: process.env.API_KEY,
    });

    await doc.loadInfo();
    const list = [];

    doc.sheetsByIndex.forEach(async (sheet, ind, arr) => {
      const dataArr = await sheet.getCellsInRange('A4:K30');
      dataArr.splice(3, 1);
      console.log(dataArr);

      for (let i = 1; i < dataArr[0].length; i++) {
        const element: any = {};
        element.model = sheet.title;

        dataArr.forEach((el) => {
          element[el[0].trim()] =
            el[i] === undefined || el[i] === ''
              ? false
              : el[i] === '+'
                ? true
                : el[i];
        });
        list.push(element);
      }
      if (ind === arr.length - 1) {
        console.log(list);

        const data = list.map((e) => {
          const keys = Object.keys(e);
          const dimensions = keys.filter((key) => {
            if (typeof +key === 'number' && e[key] === true) {
              return +key;
            }
          });
          return {
            model: e.model,
            name: e['Імя'],
            price: e['Ціна'],
            code: e['Код товару'],
            dimensions,
          };
        });
        console.log(data);
      }
    });
    return { list };
  }
}
