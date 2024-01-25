import React from 'react'
import moment from "moment";
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

function DisplayEpreuveItem({epreuve}) {
  console.log(" DISPLAY COMPOONENT ");
  console.log('-----------------------');
  console.log(epreuve);
  console.log('-----------------------');

  return (
      <View style={styles.containerEpreuves}>
        <View>
          <Text style={styles.textesContainer}>{epreuve.nom_epreuve}</Text>
          <Text style={styles.textesContainer}>{moment(epreuve.debut_epreuve).utc().format('HH:mm DD-MM-YYYY')} - {moment(epreuve.fin_epreuve).utc().format('HH:mm DD-MM-YYYY')}</Text>
          <Text style={styles.textesContainer}>Lieu : {epreuve.SitesCompetitions.nom__sitecompetition}, {epreuve.SitesCompetitions.ville_sitecompetition}</Text>
        </View>
      </View>
  )
}

export default DisplayEpreuveItem;

const styles = StyleSheet.create({
  containerEpreuves:{
      marginBottom: 20,
  }, 
  textesContainer:{
    //color:'#f5f5f5',
  }, 
});