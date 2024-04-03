import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import app from '../../Firebase';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

export default function CameraContainer() {

    const [hasPermission, setPermission] = useState(false);
    const [camera, setCamera] = useState(null);
    const [uri, setUri] = useState(null);
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const firebaseStorage = getStorage(app);
            const name = `photo${new Date().getTime()}.jpeg`;
            const photoRef = ref(firebaseStorage, name);
            await uploadPhoto(photoRef);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setMsg(error.message);
        }
    }

    async function uploadPhoto(photoRef) {
        const response = await fetch(uri);
        const photo = await response.blob();
        await uploadBytes(photoRef, photo);
        setMsg("Imagem salva com sucesso!");
        setUri(null);
    }

    useEffect(() => {
        requestCamera();
    }, []);

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator />}
            {msg && <Text>{msg}</Text>}
            {hasPermission && !uri && !loading && <>
                <Camera
                    ref={(ref) => {
                        setCamera(ref);
                    }}
                />
                <Pressable
                    onPress={() => takePicture()}>
                    <Text>Capturar</Text>
                </Pressable>
            </>}
            {uri && !loading && <>
                <Image style={styles.photo} source={{ uri }} />
                <Pressable
                    onPress={() => savePhoto()}>
                    <Text>Salvar</Text>
                </Pressable>
                <Pressable
                    onPress={() => setUri(null)}>
                    <Text>Excluir</Text>
                </Pressable>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    photo: {
        flex: 1,
    }
})
