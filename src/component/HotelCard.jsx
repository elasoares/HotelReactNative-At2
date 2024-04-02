import { StyleSheet, Text, View } from "react-native";

const HotelCard=({ hotel })=>{
  if (!hotel) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header1}>{hotel.name}</Text>
        <Text>R$ {hotel.dailyRate.toFixed(2)}/dia</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.header2}>{hotel.address}</Text>
        <Text>{hotel.proximity} m</Text>
      </View>
    </View>
  );
}
export default HotelCard;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  header1: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  header2: {
    fontSize: 14,
    color: "#666",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
