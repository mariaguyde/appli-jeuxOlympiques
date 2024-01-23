import React from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useEffect, useState } from "react";
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';

// todo sortir ça et le mettre à un seul endroit
import { createClient } from '@supabase/supabase-js'; 
const supabase = createClient("https://aqccddyuxofytfphhgoi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY2NkZHl1eG9meXRmcGhoZ29pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDIyNDI2MiwiZXhwIjoyMDE1ODAwMjYyfQ.4Gw-vzPfrcyW2kSBl54ObqHdN5_pIPASpnAczf4MLK4");


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

    return (
        <View style={styles.container}>
            <MapView
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