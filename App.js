import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import MapScreen from './src/screens/MapScreen/MapScreen';
import AddProductScreen from './src/screens/AddProductScreen/AddProductScreen';
import DetailScreen from './src/screens/DetailScreen/DetailScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default MyStack;
