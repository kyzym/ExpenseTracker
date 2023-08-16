import { View } from 'react-native';
import { ExpensesList } from './ExpensesList';
import { ExpensesSummary } from './ExpensesSummary';
import { StyleSheet } from 'react-native';
import { GeneralStyles } from '../../utils/styles';
import { Text } from 'react-native';

export const ExpensesOutput = ({ expenses, period, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses?.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={period} />
      {content}
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
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
