import { StyleSheet, View, Text } from 'react-native';
import { GeneralStyles } from '../../utils';
import { Button } from './Button';

export const ErrorOverlay = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GeneralStyles.colors.primary700,
  },
  text: { textAlign: 'center', marginBottom: 8, color: 'white' },
  title: { fontSize: 20, fontWeight: 'bold' },
});
