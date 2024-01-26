import React from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useEffect, useState } from "react";
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import { supabase } from '../lib/supabase'
import { PROVIDER_GOOGLE } from 'react-native-maps';

function Map({navigation}) {

    const [coordonneesSiteCompetitions, setCoordonneesSiteCompetitions] = useState([]);
    useEffect(() => {
        getCoordonnesSiteCompetitions();
    }, []);

    async function getCoordonnesSiteCompetitions() {
        const { data, error } = await supabase
        .from('SitesCompetitions')
        .select('*');
        setCoordonneesSiteCompetitions(data);
    }

    // Chercher la position du tel  // @react-native-get-location
    // Faire l'itineraire entre la position du tel et le site de compet (avec Navidia)
    
    // provider = {PROVIDER_GOOGLE}
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
                            coordinate={{
                                latitude: item.positionlatitude__sitecompetition,
                                longitude: item.positionlongitude_sitecompetition
                            }}
                        />
                    )
                 }
            </MapView>
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
});