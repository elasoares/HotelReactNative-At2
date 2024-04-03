import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import HotelCard from "../component/HotelCard";

const HotelContainer = ({ hotels }) => {
  if (!hotels) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando hotéis...</Text>
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
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhum dado encontrado!</Text>
    </View>
  );
}

export default HotelContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6e6e6e",
  },
});
