import { StyleSheet, View, Text, SafeAreaView, FlatList, Button } from 'react-native';
import { createClient } from '@supabase/supabase-js'; 
import { useEffect, useState } from "react";
import React from 'react'
import { supabase } from '../lib/supabase'
import { colors } from '../lib/constants'
import DisplayEpreuveItem from './DisplayEpreuveItem';

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
                style={styles.btnVoirEpreuves}
                title="S'y rendre"
                onPress={() => navigation.navigate('Map')}
              />  
          </View>
      </SafeAreaView>
          
    )
}

export default Home; 

const styles = StyleSheet.create({
  listEpreuvesContainer: {
    backgroundColor: colors.darkBlue,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listEpreuves:{
  },
  btnVoirEpreuves: {
    backgroundColor: colors.white,
    color:'#f5f5f5',
    textAlign: 'right', 
    fontWeight: 'bold'
  }
});