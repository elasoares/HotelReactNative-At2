import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import app from "../../congig/meuFirebase.js";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';

const  GaleriaContainer=()=> {

    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getPhotos() {
      setIsLoading(true);
        try {
            const firebaseStorage = getStorage(app);
            const photosRef = ref(firebaseStorage);
            const list = await listAll(photosRef);
            const urls = [...photos];
            for (let fileRef of list.items) {
                const photoRef = ref(firebaseStorage, fileRef);
                const url = await getDownloadURL(photoRef);
                if (!urls.includes(url))
                    urls.push(url);
            }
            setPhotos(urls);
        } catch (error) {
          console.log(error.message)
        }finally {
          setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {getPhotos()}, []));

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Text style={styles.text}>Quantidade de Fotos: {photos.length}</Text>
            <View style={styles.imageContainer}>
              {photos.map((uri, index) => (
                <Image key={index} style={styles.image} source={{ uri }} />
              ))}
            </View>
          </>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default GaleriaContainer;
