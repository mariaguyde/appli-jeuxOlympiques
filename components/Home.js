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


    fetchDataNativia();

    return (
        <SafeAreaView>
          <View style={styles.homeContainer}>
            <Text style={styles.titreContainer}>Prochaine épreuve</Text>
            
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
 
          </View>
      </SafeAreaView>
          
    )
}

export default Home; 

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: colors.white,
    padding: 20,
    marginTop:30,
    marginLeft:20,
    marginRight:20,
    border:"solid",
    borderWidth: 1,
    borderRadius:10,
    borderColor: "transparent"
  },
  listEpreuvesContainer: {
    //backgroundColor: colors.darkBlue,
    marginTop: 10,

  },
  listEpreuves:{
  },
  btnVoirEpreuves: {
    backgroundColor: colors.white,
    color:'#f5f5f5',
    textAlign: 'right', 
    fontWeight: 'bold'
  },
  titreContainer:{
    color: colors.black,
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16
  }, 
});