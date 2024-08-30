import { View } from 'tamagui';
import { StyleSheet, TextInput } from 'react-native';
import { forwardRef } from 'react';
import Icon from '../Icon/Icon';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#00000055',
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
});
type Props = {
  isFocused: boolean;
  setFocused: (isFocused: boolean) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};
const SearchChannel = forwardRef(
  ({ isFocused, searchValue, setFocused, setSearchValue }: Props, ref) => {
    const onFocus = () => {
      setFocused(true);
    };
    const onBlur = () => {
      setFocused(false);
    };

    return (
      <View
        onBlur={onBlur}
        style={[
          {
            flexDirection: 'row',

            marginHorizontal: 20,

            borderRadius: 15,
            paddingHorizontal: 25,
            paddingVertical: 15,
            backgroundColor: '#ddd',
          },
          isFocused ? styles.shadow : {},
        ]}
      >
        <TextInput
          ref={ref as any}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          value={searchValue}
          onChangeText={setSearchValue}
          style={{
            flex: 1,

            fontSize: 16,
            fontWeight: '500',
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder=" Search or start a message"
        />
        <Icon
          containerProps={{
            style: {
              alignSelf: 'center',
            },
          }}
          variant="search"
          color={'$gray10'}
        />
      </View>
    );
  }
);

export default SearchChannel;
