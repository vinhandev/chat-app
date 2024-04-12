import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { useWatchUser } from '~/hooks';

export default function App() {
  return <Redirect href="/illustration" />;
}
