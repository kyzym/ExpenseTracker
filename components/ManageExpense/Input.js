import { StyleSheet, Text } from 'react-native';
import { TextInput, View } from 'react-native';
import { GeneralStyles } from '../../utils';

export const Input = ({ label, style, textInputConfig, invalid }) => {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GeneralStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GeneralStyles.colors.primary100,
    color: GeneralStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: { color: GeneralStyles.colors.error500 },
  invalidInput: { backgroundColor: GeneralStyles.colors.error50 },
});
