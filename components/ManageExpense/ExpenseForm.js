import { Platform, StyleSheet, View, Alert } from 'react-native';
import { Input } from './Input';
import { Text } from 'react-native';
import { useState } from 'react';
import { Button } from '../UI';
import { getFormattedDate } from '../../utils';
// import { DatePicker } from '../UI/DatePicker';
// import { Pressable } from 'react-native';

export const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  // const [date, setDate] = useState(new Date());
  // const [showPicker, setShowPicker] = useState(false);

  // const toggleDatePicker = () => setShowPicker(!showPicker);

  // const onChangeDate = ({ type }, selectedDate) => {
  //   const currentDate = selectedDate || date;

  //   if (type === 'set') {
  //     if (Platform.OS === 'android') {
  //       toggleDatePicker();
  //     }
  //     setDate(currentDate);

  //     inputChangedHandler('date', getFormattedDate(currentDate));
  //   } else {
  //     toggleDatePicker();
  //   }
  // };

  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : '',
    date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    description: defaultValues ? defaultValues.description : '',
  });

  const inputChangedHandler = (inputId, enteredValue) => {
    if (inputId === 'amount' && enteredValue.includes(',')) {
      enteredValue = enteredValue.split(',').join('.');
    }

    setInputValues((currentValues) => {
      return {
        ...currentValues,
        [inputId]: enteredValue,
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert('Invalid input', 'Please check your input values');
      return;
    }

    onSubmit(expenseData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: (value) => inputChangedHandler('amount', value),
            value: inputValues.amount,
          }}
        />
        {/* <Pressable onPress={toggleDatePicker}> */}
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler('date', value),
            // value: inputValues.date || getFormattedDate(date),
            value: inputValues.date, //  value without date picker
            // editable: false,
          }}
        />
        {/* </Pressable> */}
        {/* {showPicker && <DatePicker date={date} onChange={onChangeDate} />} */}
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: (value) => inputChangedHandler('description', value),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { marginTop: 40 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between' },
  rowInput: { flex: 1 },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { minWidth: 120, marginHorizontal: 8 },
});
