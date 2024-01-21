import 'react-native-url-polyfill/auto'
import Home from './components/Home';
import Map from './components/Map';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Home}/>
        <Stack.Screen name="Map" component={Map}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}