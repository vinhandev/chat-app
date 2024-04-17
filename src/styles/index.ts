import { StyleSheet } from 'react-native';

const DEFAULT_PADDING_VERTICAL = 10;
const DEFAULT_PADDING_HORIZONTAL = 20;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  defaultX: {
    paddingHorizontal: DEFAULT_PADDING_HORIZONTAL,
  },
  defaultY: {
    paddingVertical: DEFAULT_PADDING_VERTICAL,
  },
});

export default styles;
