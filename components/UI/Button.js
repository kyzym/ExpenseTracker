import { StyleSheet } from 'react-native';
import { Pressable, Text, View } from 'react-native';
import { GeneralStyles } from '../../utils';

export const Button = ({ children, onPress, mode, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GeneralStyles.colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: GeneralStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GeneralStyles.colors.primary100,
    borderRadius: 4,
  },
});
