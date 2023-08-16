import { useContext, useEffect, useState } from 'react';
import { ErrorOverlay, ExpensesOutput, LoadingOverlay } from '../components';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays, getExpenses } from '../utils';

export const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchExpenses() {
      setIsFetching(true);

      try {
        const expenses = await getExpenses();

        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }

      setIsFetching(false);
    }

    fetchExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesContext.expenses?.filter((expense) => {
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
