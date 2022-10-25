import { GoogleSpreadsheet } from 'google-spreadsheet';

import {
  InstallmentItemProps,
  InstallmentManagerProps,
  MonthlyDebtProps,
  MonthlyExpensesProps,
} from '../utils/types';

export async function getApeSheet() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_APE_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: String(process.env.GOOGLE_PRIVATE_KEY).replace(/\\n/g, '\n'),
  });

  await doc.loadInfo();

  let installmentsItems: InstallmentItemProps[] = [];
  let installmentsManager: InstallmentManagerProps = {
    valuePaid: '',
    valueRemaning: '',
  };

  let sheet = doc.sheetsByIndex[0];
  const data = sheet.getRows().then((rows: any) => {
    rows.map((row: any) => {
      installmentsItems.push({
        id: row.Parcela,
        installmentNumber: row.Parcela,
        dueDate: row.Vencimento,
        value: row.Valor,
        inccMonth: row['Mês INCC'],
        incc: row['INCC (%)'],
        status: row.Status,
      });
    });

    installmentsManager.valuePaid = rows[0]['Total Pago'];
    installmentsManager.valueRemaning = rows[0]['Total Pendente'];

    return { installmentsManager, installmentsItems };
  });

  return data;
}

export async function getMonthlySheet(title: string) {
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

  let sheet = doc.sheetsByTitle[title];

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
