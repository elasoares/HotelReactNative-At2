import { FlatList,  StyleSheet, Text, View } from "react-native";
import HotelCard from "../component/HotelCard";

 const  HotelContainer=({ hotels })=> {

  if (!hotels) {
    return (
      <View>
        <Text>Carregando hotéis...</Text>
      </View>
    );
  }
  
  function renderCard({ item }) {
    return <HotelCard hotel={item} />;
  }

  return hotels.length > 0 ? (
    <View style={styles.container}>
      <FlatList
        data={hotels}
        renderItem={renderCard}
        keyExtractor={(item) => "hotel_" + item.id} 
      />
    </View>
  ) : (
    <View>
      <Text>Nenhum dado encontrado!</Text>
    </View>
  );
}

export default HotelContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
