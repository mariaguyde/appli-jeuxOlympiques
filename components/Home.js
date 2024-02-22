import { StyleSheet, View, Text, SafeAreaView, FlatList, Button } from 'react-native';
import { createClient } from '@supabase/supabase-js'; 
import { useEffect, useState } from "react";
import React from 'react'
import { supabase } from '../lib/supabase'
import { colors } from '../lib/constants'
import DisplayEpreuveItem from './DisplayEpreuveItem';
import axios from 'axios';

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

    const fetchDataNativia = async () => {
      console.log('fetchData NATIVIA');
        try {
            // TODO à dynamiser 
            const response = await axios.get(
              "https://api.navitia.io/v1/journeys?from=2.36066%3B48.84237&to=2.35475%3B48.88035&"
            , {
              headers: {
                  'Authorization': `69aa33e5-d8c5-4b2c-b571-63383a3915c7`,
              }
            });
            console.log(response.data.journeys[0].sections.length);

            const itineraire = [];
            
            console.log("On va faire le chemin suivant : "); 
            for (let i=0; i<response.data.journeys[0].sections.length; i++) {
                //console.log(response.data.journeys[0].sections[i]);
                let boutItineraire = response.data.journeys[0].sections[i]; 
                itineraire[i] = {
                  mode: boutItineraire.mode, 
                  directionsLiterraire: boutItineraire.path, 
                  pointDepart: boutItineraire.from, 
                  pointArrivee: boutItineraire.to 
                }
                //console.log("- " + itineraire[i].pointDepart.name + " - " + itineraire[i].pointArrivee.name );


                console.log("________________________________________________");
            }

        } catch (err) {
            console.log(err.response);
        }
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