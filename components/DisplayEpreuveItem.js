import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

function DisplayEpreuveItem({epreuve}) {
  console.log(" DISPLAY COMPOONENT ");
  console.log(epreuve);
  console.log('-----------------------');

  console.log(epreuve.SitesCompetitions);
  return (
      <View style={styles.containerEpreuves}>
        <Text style={{ color: "#f5f5f5" }}>Prochaine épreuve</Text>
        <View>
          <Text style={{ color: "#f5f5f5" }}>{epreuve.nom_epreuve}</Text>
          <Text style={{ color: "#f5f5f5" }}>{epreuve.debut_epreuve} - {epreuve.fin_epreuve}</Text>
          <Text style={{ color: "#f5f5f5" }}>Lieu : {epreuve.SitesCompetitions.nom__sitecompetition}, {epreuve.SitesCompetitions.ville_sitecompetition}</Text>
        </View>
        <Text  style={{ color:"#f5f5f5"}}>Voir tous les épreuves</Text>
      </View>
  )
}

export default DisplayEpreuveItem;

const styles = StyleSheet.create({
  containerEpreuves:{
      padding: 20,
      backgroundColor:'#366643',
  }
});