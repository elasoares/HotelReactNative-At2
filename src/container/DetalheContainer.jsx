import { Text, View, StyleSheet } from "react-native";
import { ScrollView, Image, Pressable } from "react-native";
import { useState } from "react";

const DetalheContainer=({ event })=> {
  const { name, description, images, price, location, date } = event;
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


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const configImage = { uri: images[imageIndex] };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Image style={styles.image} source={configImage} />

      <View style={styles.imageControl}>
        <Pressable onPress={prevImage} style={styles.button}>
          <Text style={styles.buttonText}>Anterior</Text>
        </Pressable>
        <Pressable onPress={nextImage} style={styles.button}>
          <Text style={styles.buttonText}>Próxima</Text>
        </Pressable>
      </View>

    
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>


      <View style={styles.infoContainer}>
      <View style={styles.containerLocationEPrice}>
        <Text style={styles.description}>Localização: {location}</Text>
        <Text style={styles.infoText}>R${price}</Text>
</View>
         <Text style={styles.description}>Data: {formatDate(date)}</Text>
       
      </View>

    </View>
  );
}
export default DetalheContainer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    backgroundColor: '#f0f0f0', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  imageControl: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginHorizontal: 5,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  containerLocationEPrice:{
    flexDirection:"row",
    justifyContent:"space-between"
  }
});