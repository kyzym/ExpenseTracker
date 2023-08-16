import { useContext } from 'react';
import { ExpensesOutput } from '../components';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils';

export const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      period="Last 7 Days"
      fallbackText="No expenses for the last 7 days."
    />
  );
};
