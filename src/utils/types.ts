export interface InstallmentItemProps {
  id: string;
  installmentNumber: string;
  dueDate: string;
  value: string;
  inccMonth?: string;
  incc?: string;
  status: string;
}

export interface InstallmentManagerProps {
  valuePaid: string;
  valueRemaning: string;
}

export interface MonthlyExpensesProps {
  person: string;
  expenses: {
    title: string;
    value: string;
  }[];
  totalValue: string;
}

export interface MonthlyDebtProps {
  person: string;
  value: string;
}
