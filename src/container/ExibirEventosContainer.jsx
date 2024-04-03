import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Text, ActivityIndicator, Image } from "react-native";
import Routes from "../pages/routes";
import DetalheContainer from "./DetalheContainer";
import HotelContainer from "./HotelContainer";

const Tab = createBottomTabNavigator();

const ExibirEventosContainer = (props) => {
  const [event, setEvent] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const { params } = props.route || {};
  const { id } = params || {};
  
  useEffect(() => {
    const url = "https://projetoatpb-default-rtdb.firebaseio.com/events";
    setIsLoading(true);
    fetch(`${url}/${id}.json`) 
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setEvent({ id, ...data });
        } else {
          setMsg("Evento não encontrado.");
        }
      })
      .catch((error) => setMsg(error.message))
      .finally(() => setIsLoading(false)); 
  }, [id]);

  if (isLoading) {
    return <ActivityIndicator style={styles.container} size="large" color="#0000ff" />;
  }

  if (msg) {
    return (
      <View style={styles.container}>
        <Text>{msg}</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name={Routes.DetalhesContainer}>
        {() => <DetalheContainer event={event} />}
      </Tab.Screen>
         
      <Tab.Screen name={Routes.HotelContainer}>
        {() => <HotelContainer hotels={event.hotels} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default ExibirEventosContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: 270,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descricao: {
    fontStyle: "normal",
    marginBottom: 2,
  },
  compraEvalor: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 120,
    gap: 20,
  },
  botaoDeCompraContainer: {
    width: 120,
    height: "auto",
    padding: 10,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#f6bd60",
    borderColor: "#eff6e0",
    alignSelf: "center",
  },
  botaoDeCompra: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  preco: {
    color: "#f6bd60",
    fontSize: 16,
    fontWeight: "bold",
  },
});
