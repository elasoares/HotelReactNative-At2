import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {
  Image,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";


import { Camera } from "expo-camera";

 const SignUpPage=()=> {
  const {height, width} = useWindowDimensions();  
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  /* =====================Camera ================================== */
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    getCamerapermission();
  }, []);

  const getCamerapermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setHasCameraPermission(true);
    }
  };

  const verificarUsuario = () => {
    setIsLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        setMsg("Usuário válido.");
      })
      .catch((error) => {
        setMsg(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const takePicture = async () => {
    if (camera) {
      const picture = await camera.takePictureAsync();
      setPhotoUri(picture.uri);
    }
  };

  return (
    <View style={styles.container}>
      {hasCameraPermission && <Text>Camera Permission: Granted</Text>}
      {isLoading && <ActivityIndicator />}

      {!photoUri && (
        <View>
          <Camera
            style={styles.cameraStyles}
            ref={(refCamera) => setCamera(refCamera)}
          />
          <Pressable
            style={styles.btnTakePicture}
            onPress={() => takePicture()}
          >
            <Text>Tirar Foto</Text>
          </Pressable>
        </View>
      )}

      {photoUri && (
        <>
          <Image source={{ uri: photoUri }} style={styles.photo} />
          <Pressable
            style={styles.btnTakePicture}
            onPress={() => setPhotoUri(null)}
          >
            <Text>Tirar nova foto</Text>
          </Pressable>
        </>
      )}

      {!isLoading && (
        <View>
          <Text>Email:</Text>
          <TextInput value={userEmail} onChangeText={setUserEmail} />
          <Text>Senha: </Text>
          <TextInput value={userPassword} onChangeText={setUserPassword} />
          <Pressable onPress={verificarUsuario} style={styles.btn}>
            <Text style={styles.btnLabel}>Acessar</Text>
          </Pressable>
        </View>
      )}
      {msg && <Text>{msg}</Text>}
    </View>
  );
      }
      export default SignUpPage;

      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  containerCamera: {
    flex: 1,
    width: "50%",
    height: "50%",
  },
  cameraStyles: {
    flex: 1,
    height: 200,
  },
  btnTakePicture: {},

  btn: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  btnLabel: {
    color: "white",
    textAlign: "center",
  },
});
