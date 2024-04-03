import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { useState } from "react";

 const  GaleriaContainer=({ event })=> {
  const { images } = event;
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const configImage = { uri: images[imageIndex] };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={configImage} />
      <View style={styles.imageControl}>
        <Pressable onPress={prevImage}>
          <Text>Anterior</Text>
        </Pressable>
        <Pressable onPress={nextImage}>
          <Text>Próxima</Text>
        </Pressable>
      </View>
    </View>
  );
}
export default GaleriaContainer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  imageControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
