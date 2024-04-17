import { Stack, Tabs } from 'expo-router';
import { Icon } from '~/components';

export default function MainLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Icon variant="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Icon variant="profile" color={color} />,
        }}
      />
    </Tabs>
  );
}
