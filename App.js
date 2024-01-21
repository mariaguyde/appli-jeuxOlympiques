import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { useEffect, useState } from "react";
import 'react-native-url-polyfill/auto'
import Home from './components/Home';


export default function App() {

  return (
      <SafeAreaView>
          <Home/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerApp:{
      paddingTop: 80,
  }
});