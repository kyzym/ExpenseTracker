import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GeneralStyles, getFormattedDate } from '../../utils';
import { Button } from '../UI';
import { Input } from './Input';
// import { DatePicker } from '../UI/DatePicker';
// import { Pressable } from 'react-native';
// import { Platform } from 'react-native';

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

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },

    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },

    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  const inputChangedHandler = (inputId, enteredValue) => {
    if (inputId === 'amount' && enteredValue.includes(',')) {
      enteredValue = enteredValue.split(',').join('.');
    }

    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputId]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: (value) => inputChangedHandler('amount', value),
            value: inputs.amount.value,
          }}
        />
        {/* <Pressable onPress={toggleDatePicker}> */}
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler('date', value),
            // value: inputValues.date || getFormattedDate(date),
            value: inputs.date.value, //  value without date picker
            // editable: false,
          }}
        />
        {/* </Pressable> */}
        {/* {showPicker && <DatePicker date={date} onChange={onChangeDate} />} */}
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: (value) => inputChangedHandler('description', value),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values</Text>
      )}
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
  errorText: {
    textAlign: 'center',
    color: GeneralStyles.colors.error500,
    margin: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: { minWidth: 120, marginHorizontal: 8 },
});
