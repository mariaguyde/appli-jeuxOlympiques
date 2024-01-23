import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList, Button } from 'react-native';
import { useEffect, useState } from "react";
import DisplayEpreuveItem from './DisplayEpreuveItem';
import { createClient } from '@supabase/supabase-js'; 
import { supabase } from '../lib/supabase'

function Home({navigation}) {
    const [epreuves, setEpreuves] = useState([]);
    useEffect(() => {
      getEpreuves();
    }, []);
  
    async function getEpreuves() {
      const { data, errors, status } =  await supabase
      .from('Epreuves')
      .select('*, SitesCompetitions(*)')
      .order('debut_epreuve', { ascending: true })
      .limit(1);
      setEpreuves(data);
    }

    return (
        <SafeAreaView>
          <View style={styles.listEpreuvesContainer}>
            <FlatList
                    style={styles.listEpreuves}
                    data={epreuves}
                    renderItem={({item}) => <DisplayEpreuveItem epreuve={item}/>}
                    keyExtractor={(item) => {
                      return item.id;
                    }}
            />
            <Button
                title="Voir toutes les épreuves"
                onPress={() => navigation.navigate('Map')}
              />  
            <Text>Test branch affichage map site : 1 </Text>
          </View>
      </SafeAreaView>
          
    )
}

export default Home; 

const styles = StyleSheet.create({
  listEpreuvesContainer: {
    backgroundColor:'#036fb7',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listEpreuves:{
  },
  btnVoirEpreuves: {
    color:'#f5f5f5',
    textAlign: 'right', 
    fontWeight: 'bold'
  }
});