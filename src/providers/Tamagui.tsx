import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '~/configs';

export const Tamagui = ({ children }: { children: React.ReactNode }) => {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>;
};
