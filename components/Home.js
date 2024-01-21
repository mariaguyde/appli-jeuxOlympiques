import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { useEffect, useState } from "react";
//import databaseConfig from './databaseConfig'; 
import { createClient } from '@supabase/supabase-js'; 
//import Header from './Header';
import DisplayEpreuveItem from './DisplayEpreuveItem';
const supabase = createClient("https://aqccddyuxofytfphhgoi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY2NkZHl1eG9meXRmcGhoZ29pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDIyNDI2MiwiZXhwIjoyMDE1ODAwMjYyfQ.4Gw-vzPfrcyW2kSBl54ObqHdN5_pIPASpnAczf4MLK4");

function Home() {

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
                    keyExtractor={item => item.id} 
            />
            <Text>Test 3</Text>
            <Text  style={styles.btnVoirEpreuves}>Voir tous les épreuves</Text>
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