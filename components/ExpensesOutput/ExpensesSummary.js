import { StyleSheet, Text, View } from 'react-native';
import { GeneralStyles } from '../../utils/styles';

export const ExpensesSummary = ({ expenses, periodName }) => {
  const expensesSum = expenses
    .reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GeneralStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GeneralStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GeneralStyles.colors.primary500,
  },
});
