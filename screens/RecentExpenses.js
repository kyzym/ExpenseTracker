import { StyleSheet } from 'react-native';
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';

export const RecentExpenses = () => {
  return <ExpensesOutput period="Last 7 Days" />;
};

const style = StyleSheet.create({});
