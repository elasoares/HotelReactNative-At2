import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import app from '../../congig/meuFirebase.js';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const CameraContainer=()=> {

    const [hasPermission, setPermission] = useState(false);
    const [camera, setCamera] = useState(null);
    const [uri, setUri] = useState(null);
    const [msg, setMsg] = useState(null);
  

    async function requestCamera() {
        const permission = await Camera.requestCameraPermissionsAsync();
        const { status } = permission;
        if (status == "granted") {
            setPermission(true);
        }
    }

    async function takePicture() {
        if (camera) {
            const photo = await camera.takePictureAsync();
            const { uri } = photo;
            setUri(uri);
        }
    }

    async function savePhoto(){
        try {
            const firebaseStorage = getStorage(app);
            const name = `photo${new Date().getTime()}.jpeg`;
            const photoRef = ref(firebaseStorage, name);
            uploadPhoto(photoRef);
        } catch (error) {
            setMsg(error.message);
        }
    }

    async function uploadPhoto(photoRef) {
        const response = await fetch(uri);
        const photo = await response.blob();
        const uploadResult = await uploadBytes(photoRef, photo);
        if (uploadResult) setUri(null);
        else setMsg("Algo deu errado!");
    }

    useEffect(() => {
        requestCamera();
    }, []);

    return (
        <View style={styles.container}>
            {msg && <Text>{msg}</Text>}
            {hasPermission && !uri && <>
                <Camera
                    ref={(ref) => {
                        setCamera(ref);
                    }}
                />

              <View style={styles.containerBotaoCapitura}>  
              <Pressable style={styles.botao}
                    onPress={() => takePicture()}>
                    <Text style={styles.textoBotao}>Capturar</Text>
                </Pressable>
                </View>

            </>}
            {uri && <>
                <Image style={styles.photo} source={{ uri }} />
                <View style={styles.containerBotoesSalvarEExcluir}>
                <Pressable  style={[styles.botao, styles.botaoSalvar]} 
                    onPress={() => savePhoto()}>
                    <Text style={styles.textoBotao}>Salvar</Text>
                </Pressable>
                <Pressable style={[styles.botao, styles.botaoExcluir]} 
                    onPress={() => setUri(null)}>
                    <Text style={styles.textoBotao}>Excluir</Text>
                </Pressable>
                </View>
            </>}
        </View>
    )
}

export default CameraContainer;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#f0f0f0', 
  },
  photo: {
      flex: 5,
      justifyContent: 'flex-end', 
      alignItems: 'center', 
      margin: 20, 
      borderRadius: 10, 
      overflow: 'hidden', 
  },
  containerBotoesSalvarEExcluir: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 20, 
  },
  botao: {
      borderWidth: 1,
      borderColor: "#ddd", 
      backgroundColor: "#007BFF", 
      width: 100,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20, 
      elevation: 2,
  },
  botaoExcluir: {
      backgroundColor: "#FF6347", 
  },
  textoBotao: {
      color: "#ffffff", 
      fontWeight: "bold",
  },
  mensagemStatus: {
      textAlign: 'center',
      color: '#555555',
      paddingBottom: 20, 
  },
  containerBotaoCapitura:{
    justifyContent: "center",
    alignItems: "center",
    textAlign:"center"
  }
});
