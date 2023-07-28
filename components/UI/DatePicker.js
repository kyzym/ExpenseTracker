import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePicker = ({ onChange, date }) => {
  return (
    <DateTimePicker
      onChange={onChange}
      mode="date"
      display="default"
      value={date}
    />
  );
};
