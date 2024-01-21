import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';


function Map({navigation}) {

    return (
        <View style={styles.container}>
            <MapView
                style={styles.maps}
                initialRegion={{
                latitude: 48.864716,
                longitude: 2.349014,
                latitudeDelta: 0.0622,
                longitudeDelta: 0.0121,
                }}/>
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
