import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  
} from "react-native";
import { useState } from "react";

 const EventPage=(props)=> {
  const { params } = props.route;

  const { name, description, images } = params;
  const [image, setImage] = useState(0);

  const configImag = { uri: images[image] };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={configImag} />
      <Text>{name}</Text>
      <ScrollView>
        <Text>{description}</Text>
      </ScrollView>
    </View>
  );
}

export default EventPage;

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
  imageControle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
