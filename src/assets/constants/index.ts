import { Dimensions } from 'react-native';

const sizes = Dimensions.get('window');

export default {
  fullWidth: sizes.width,
  fullHeight: sizes.height,
};
