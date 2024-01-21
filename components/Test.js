import React from 'react'
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Test({navigation}) {
    
    return (
        <View>
            <Text>Navigation works !</Text>
        </View>
    );
}

export default Test


