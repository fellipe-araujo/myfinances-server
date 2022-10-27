import { GoogleSpreadsheet } from 'google-spreadsheet';

import { MonthlyDebtProps, MonthlyExpensesProps } from '../utils/types';

export async function getMonthlySheet(period: string) {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_MONTHLY_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: String(process.env.GOOGLE_PRIVATE_KEY).replace(/\\n/g, '\n'),
  });

  await doc.loadInfo();

  let person1_expenses: MonthlyExpensesProps = {
    person: '',
    expenses: [],
    totalValue: '',
  };
  let person2_expenses: MonthlyExpensesProps = {
    person: '',
    expenses: [],
    totalValue: '',
  };
  let debt: MonthlyDebtProps = {
    person: '',
    value: '',
  };

  let sheet = doc.sheetsByIndex[Number(period)];

  const data = sheet.getRows().then((rows: any) => {
    rows.map((row: any, index: number) => {
      if (row['Despesas-P1']) {
        person1_expenses.expenses.push({
          title: row['Despesas-P1'],
          value: row['Valor-P1'],
        });
      }

      if (row['Despesas-P2']) {
        person2_expenses.expenses.push({
          title: row['Despesas-P2'],
          value: row['Valor-P2'],
        });
      }

      if (index === 0) {
        person1_expenses.person = row['P1'];
        person1_expenses.totalValue = row['Total-P1'];

        person2_expenses.person = row['P2'];
        person2_expenses.totalValue = row['Total-P2'];

        debt.person = row['Quem vai pagar para o outro?'];
        debt.value = row['Valor'];
      }
    });

    return { person1_expenses, person2_expenses, debt };
  });

  return data;
}

export async function getPagesFromSheet() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_MONTHLY_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: String(process.env.GOOGLE_PRIVATE_KEY).replace(/\\n/g, '\n'),
  });

  await doc.loadInfo();

  let sheetCount = doc.sheetCount;
  let periods: string[] = [];

  for (let i = 0; i < sheetCount; i++) {
    let item = doc.sheetsByIndex[i];
    periods.push(item.title);
  }

  return periods;
}
