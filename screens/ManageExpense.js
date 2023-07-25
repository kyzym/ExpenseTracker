import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Button } from '../components/UI';
import { GeneralStyles } from '../utils';
import { ExpensesContext } from '../store/expenses-contes';

export const ManageExpense = ({ route, navigation }) => {
  const expenseContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    navigation.goBack();
    expenseContext.deleteExpense(editedExpenseId);
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEditing) {
      expenseContext.updateExpense(editedExpenseId, {
        description: 'Test!!!!!',
        amount: 11239,
        date: new Date('2023-07-23'),
      });
    } else {
      expenseContext.addExpense({
        description: 'Test',
        amount: 19,
        date: new Date('2023-07-21'),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GeneralStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GeneralStyles.colors.primary800,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { minWidth: 120, marginHorizontal: 8 },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GeneralStyles.colors.primary200,
    alignItems: 'center',
  },
});
