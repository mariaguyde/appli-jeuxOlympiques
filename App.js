import 'react-native-url-polyfill/auto'
import Home from './components/Home';
import Test from './components/Test';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Home}/>
        <Stack.Screen name="Test" component={Test}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}