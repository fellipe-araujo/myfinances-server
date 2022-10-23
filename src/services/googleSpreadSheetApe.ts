const { GoogleSpreadsheet } = require('google-spreadsheet');

interface InstallmentItemProps {
  id: string;
  installmentNumber: string;
  dueDate: string;
  value: string;
  inccMonth?: string;
  incc?: string;
  status: string;
}

interface InstallmentsManagerProps {
  valuePaid: string;
  valueRemaning: string;
}

export async function getApeSheet() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_APE_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: String(process.env.GOOGLE_PRIVATE_KEY).replace(/\\n/g, '\n'),
  });

  await doc.loadInfo();

  let installmentsItems: InstallmentItemProps[] = [];
  let installmentsManager: InstallmentsManagerProps = {
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
