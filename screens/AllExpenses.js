import { useContext } from 'react';
import { ExpensesOutput } from '../components';
import { ExpensesContext } from '../store/expenses-context';

export const AllExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      period="Total"
      fallbackText="No registered expenses found"
    />
  );
};
