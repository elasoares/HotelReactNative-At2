import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Routes from "../pages/routes";
import ListaContainer from "../container/ListaContainer";
import ExibirEventosContainer from "../container/ExibirEventosContainer";

const Stack = createNativeStackNavigator();

function converter(data) {
  const ids = Object.keys(data);
  const events = Object.values(data);
  const eventsList = events.map((event, index) => {
    return { id: ids[index], ...event };
  });
  return eventsList;
}

 const EventsListPage=({ navigation })=> {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = "https://projetoatpb-default-rtdb.firebaseio.com/";
  const resource = "events";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${url}/${resource}.json`);
        if (!response.ok) {
          throw new Error("Erro ao buscar eventos");
        }
        const responseJson = await response.json();

        const convertedList = converter(responseJson);
        setEvents(convertedList);
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function selectEvents(event) {
    navigation.navigate(Routes.ExibirEventosContainer, {id: event.id});
  }

  return (
    <View style={styles.container}>
    {isLoading ? (
  <ActivityIndicator size="large" color="#0000ff" />
) : events.length > 0 ? (
  <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={Routes.ListaContainer}>
      {() => <ListaContainer events={events} action={selectEvents} />}
    </Stack.Screen>

    <Stack.Screen
      name={Routes.ExibirEventosContainer}
      component={ExibirEventosContainer}
    />
  </Stack.Navigator>
) : (
  <Text>Nenhum evento encontrado</Text>
)}
    </View>
  );
}
export default EventsListPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#f7ede2",
  },
});
