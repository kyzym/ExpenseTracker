import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GeneralStyles } from '../../utils/styles';
import { getFormattedDate } from '../../utils';
import { useNavigation } from '@react-navigation/native';

export const ExpenseItem = ({ description, amount, date, id }) => {
  const navigation = useNavigation();

  const expressPressHandler = () => {
    navigation.navigate('ManageExpense', { expenseId: id });
  };

  return (
    <Pressable
      onPress={expressPressHandler}
      style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.item}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GeneralStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GeneralStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: { color: GeneralStyles.colors.primary50 },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: { color: GeneralStyles.colors.primary500, fontWeight: 'bold' },
});
