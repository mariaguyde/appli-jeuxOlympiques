import React from 'react'
import {View, StyleSheet, Dimensions, Text, Button } from 'react-native';
import { useEffect, useState } from "react";
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import { supabase } from '../lib/supabase'
import { PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from "react-native-modal";
import axios from 'axios';


function Map({navigation}) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const [coordonneesSiteCompetitions, setCoordonneesSiteCompetitions] = useState([]);
    const [itineraireEtapes, setItineraireEtapes] = useState([]);
    useEffect(() => {
        getCoordonnesSiteCompetitions();
        fetchDataNativia();
    }, []);

    async function getCoordonnesSiteCompetitions() {
        const { data, error } = await supabase
        .from('SitesCompetitions')
        .select('*');
        setCoordonneesSiteCompetitions(data);
    }

    function displayItineraireModal () {
        setIsModalVisible(true);
    }

    async function fetchDataNativia () {
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
  
              let itineraire = [];
              console.log("______________________ " + Date.now() + " __________________________");
  
              console.log("On va faire le chemin suivant : "); 
              for (let i=0; i<response.data.journeys[0].sections.length; i++) {
                  //console.log(response.data.journeys[0].sections[i]);
                  let boutItineraire = response.data.journeys[0].sections[i]; 
                  itineraire[i] = {
                    mode: boutItineraire.mode, 
                    directionsLiterraire: boutItineraire.path, 
                    pointDepart: boutItineraire.from, 
                    pointArrivee: boutItineraire.to, 
                    departureTime: response.data.journeys[0].departure_date_time,
                    arriveeTime: response.data.journeys[0].arrival_date_time
                  }
  
                  console.log("- " + itineraire[i].pointDepart.name + " - " + itineraire[i].pointArrivee.name );
                  //console.log("- " + convertDate(itineraire[i].pointDepart.departure_date_time) + itineraire[i].pointDepart.name + " - " + itineraire[i].pointArrivee.name );
              }
              console.log("________________________________________________");
              setItineraireEtapes(itineraire);

              console.log('itineraire pho');
              console.log(itineraireEtapes);
          } catch (err) {
              console.log(err.response);
          }
    }
  
    const convertDate = (chaineDateHeure) => {
  
        // Extraire les composants de la chaîne
        var annee = parseInt(chaineDateHeure.substr(0, 4), 10);
        var mois = parseInt(chaineDateHeure.substr(4, 2), 10) - 1; // Mois est 0-indexé dans JavaScript, donc on soustrait 1
        var jour = parseInt(chaineDateHeure.substr(6, 2), 10);
        var heure = parseInt(chaineDateHeure.substr(9, 2), 10);
        var minute = parseInt(chaineDateHeure.substr(11, 2), 10);
        var seconde = parseInt(chaineDateHeure.substr(13, 2), 10);
  
        // Créer un objet Date
        var date = new Date(annee, mois, jour, heure, minute, seconde);
  
        // Formater la date
        //var options = { hour: 'numeric', minute: 'numeric', day: '2-digit', month: '2-digit', year: 'numeric' };
        //var dateFormatee = date.toLocaleString('fr-FR', options);
  
        var dateFormatee = date.toLocaleString('fr-FR', options);
        // Obtenir uniquement la partie de l'heure
        var heureFormatee = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  
        return heureFormatee; 
    }


    // Chercher la position du tel  // @react-native-get-location
    // Faire l'itineraire entre la position du tel et le site de compet (avec Navidia)
    return (
        <View style={styles.container}>
            <MapView
                provider = {PROVIDER_GOOGLE}
                style={styles.maps}
                initialRegion={{
                latitude: 48.864716,
                longitude: 2.349014,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0121,
            }}>
                 {
                    coordonneesSiteCompetitions.map((item, index) => 
                        <Marker
                            key={index} 
                            onPress={displayItineraireModal}
                            coordinate={{
                                latitude: item.positionlatitude__sitecompetition,
                                longitude: item.positionlongitude_sitecompetition
                            }}
                        />
                    )
                 }
            </MapView>
            <Modal style={styles.modalItineraire} isVisible={isModalVisible}>
                  
                  <Text>Test Modal</Text>
                  {/*<Text>{itineraireEtapes[0].mode}</Text>{//*/}

                  <Button title="Hide modal" onPress={handleModal} />
            </Modal>
        </View>
    );
}

export default Map

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    maps: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
    },
    modalItineraire: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 20
    }
});