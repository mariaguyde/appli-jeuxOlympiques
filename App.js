import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { useEffect, useState } from "react";
import 'react-native-url-polyfill/auto'
import databaseConfig from "./databaseConfig"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(databaseConfig.supabase_url, databaseConfig.supabase_key);

export default function App() {
  const [epreuves, setEpreuves] = useState([]);

  useEffect(() => {
    getEpreuves();
  }, []);

  async function getEpreuves() {
    const { data, errors, status } = await supabase.from("test").select("*");
    setEpreuves(data);
    console.log(data);
  }

  return (
      <SafeAreaView>
        <Text>MARIO</Text>
        <FlatList
            data={epreuves}
            renderItem={({item}) => <Text>{item.nom}</Text>}
            keyExtractor={item => item.id}
        />
      </SafeAreaView>
  );
}
