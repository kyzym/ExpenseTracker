import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of bear',
    amount: 59.99,
    date: new Date('2023-07-10'),
  },
  {
    id: 'e2',
    description: 'A pair of burgers',
    amount: 15.99,
    date: new Date('2023-07-11'),
  },
  {
    id: 'e3',
    description: 'Some ice cream',
    amount: 3.11,
    date: new Date('2023-07-12'),
  },
  {
    id: 'e4',
    description: 'GPT',
    amount: 20,
    date: new Date('2023-07-20'),
  },
  {
    id: 'e5',
    description: 'Polish',
    amount: 2,
    date: new Date('2023-07-20'),
  },
  {
    id: 'e11',
    description: 'A pair of bear',
    amount: 59.99,
    date: new Date('2023-07-10'),
  },
  {
    id: 'e21',
    description: 'A pair of burgers',
    amount: 15.99,
    date: new Date('2023-07-11'),
  },
  {
    id: 'e31',
    description: 'Some ice cream',
    amount: 3.11,
    date: new Date('2023-07-12'),
  },
  {
    id: 'e41',
    description: 'GPT',
    amount: 20,
    date: new Date('2023-07-20'),
  },
  {
    id: 'e51',
    description: 'Polish',
    amount: 2,
    date: new Date('2023-07-20'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();

      return [{ ...action.payload, id: id }, ...state];

    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];

      const updatedItem = { ...updatableExpense, ...action.payload.data };

      const updatedExpenses = [...state];

      updatedExpenses[updatableExpenseIndex] = updatedItem;

      return updatedExpenses;

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
