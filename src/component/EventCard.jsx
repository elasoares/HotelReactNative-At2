import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
 const  EventCard=({ item, action })=> {
  const { name, price, images } = item;
  const imgConfig = { uri: images && images.length > 0 ? images[0] : null };


  return (
    <Pressable onPress={() => action(item)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.cardImage} source={imgConfig} />
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.listItem}>{name}</Text>
          <Text style={styles.listItem}>R$ {price}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default EventCard;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    marginVertical: 1,
    flexDirection: "row",
    shadowColor: "#000",
    shadowRadius: 1.84,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
  },
  imageContainer: {},
  cardImage: {
    width: 100,
    height: 100,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 8,
  },
  listItem: {
    paddingVertical: 4,
    marginVertical: 2,
  },
});
