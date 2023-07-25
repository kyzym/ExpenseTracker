import { View } from 'react-native';
import { ExpensesList } from './ExpensesList';
import { ExpensesSummary } from './ExpensesSummary';
import { StyleSheet } from 'react-native';
import { GeneralStyles } from '../../utils/styles';

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

export const ExpensesOutput = ({ expenses, period }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={period} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: GeneralStyles.colors.primary700,
  },
});
