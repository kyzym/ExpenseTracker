import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ErrorOverlay,
  ExpenseForm,
  IconButton,
  LoadingOverlay,
} from '../components';
import { ExpensesContext } from '../store/expenses-context';
import { GeneralStyles } from '../utils';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';

export const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expenseContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;

  const isEditing = !!editedExpenseId;

  const selectedExpense = expenseContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);

    try {
      await deleteExpense(editedExpenseId);

      expenseContext.deleteExpense(editedExpenseId);

      navigation.goBack();
    } catch (error) {
      setError('Error in delete expenses!');
    }
    setIsSubmitting(false);
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        await updateExpense(editedExpenseId, expenseData);

        expenseContext.updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);

        expenseContext.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data');
      setIsSubmitting(false);
    }
  };

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />

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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GeneralStyles.colors.primary200,
    alignItems: 'center',
  },
});
