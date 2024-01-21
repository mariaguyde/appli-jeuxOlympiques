import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList, Button } from 'react-native';
import { useEffect, useState } from "react";
//import databaseConfig from './databaseConfig'; 
import DisplayEpreuveItem from './DisplayEpreuveItem';
import { createClient } from '@supabase/supabase-js'; 
const supabase = createClient("https://aqccddyuxofytfphhgoi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY2NkZHl1eG9meXRmcGhoZ29pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDIyNDI2MiwiZXhwIjoyMDE1ODAwMjYyfQ.4Gw-vzPfrcyW2kSBl54ObqHdN5_pIPASpnAczf4MLK4");

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