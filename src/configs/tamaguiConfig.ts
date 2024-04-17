import { config } from '@tamagui/config/v3';

import { createFont, createTamagui } from 'tamagui';
const interFont = createFont({
  ...config.fonts,
  family: 'Inter-Regular',
  weight: {
    1: '100',
    2: '200',
    3: '300',
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    8: '800',
    9: '900',
  },
  face: {
    100: { normal: 'Inter-Thin' },
    200: { normal: 'Inter-ExtraLight' },
    300: { normal: 'Inter-Light' },
    400: { normal: 'Inter-Regular' },
    500: { normal: 'Inter-Medium' },
    600: { normal: 'Inter-SemiBold' },
    700: { normal: 'Inter-Bold' },
    800: { normal: 'Inter-ExtraBold' },
    900: { normal: 'Inter-Black' },
  },
  size: {
    1: 10,
    2: 12,
    3: 14,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 32,
    9: 48,
    10: 64,
  },
});
const workSansFont = createFont({
  ...config.fonts,
  family: 'WorkSans-Regular',
  weight: {
    1: '100',
    2: '200',
    3: '300',
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    8: '800',
    9: '900',
  },
  face: {
    100: { normal: 'WorkSans-Thin' },
    200: { normal: 'WorkSans-ExtraLight' },
    300: { normal: 'WorkSans-Light' },
    400: { normal: 'WorkSans-Regular' },
    500: { normal: 'WorkSans-Medium' },
    600: { normal: 'WorkSans-SemiBold' },
    700: { normal: 'WorkSans-Bold' },
    800: { normal: 'WorkSans-ExtraBold' },
    900: { normal: 'WorkSans-Black' },
  },
  size: {
    1: 10,
    2: 12,
    3: 14,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 32,
    9: 48,
    10: 64,
  },
});
const tamaguiConfig = createTamagui({
  ...config,
  fonts: {
    heading: workSansFont,
    body: interFont,
    silkscreen: interFont,
    mono: interFont,
  },
});
// this makes typescript properly type everything based on the config

type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
export default tamaguiConfig;
