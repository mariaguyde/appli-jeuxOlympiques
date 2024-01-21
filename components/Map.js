import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState } from "react";
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';


function Map({navigation}) {

    const [coordinates] = useState([
        {
            latitude: 48.8587741,
            longitude: 2.2069771,
        },
        {
            latitude: 48.8323785,
            longitude: 2.3361663,
        },
    ]);

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

                <Marker coordinate={coordinates[0]} />
                <Marker coordinate={coordinates[1]} />
        
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
