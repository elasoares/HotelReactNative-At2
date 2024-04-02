import { useEffect, useState, StyleSheet } from "react";
import { Text, View, StyleSheet } from "react-native";

function converter(data) {
  const ids = Object.keys(data);
  const events = Object.values(data);
  const eventsList = events.map((event, index) => {
    return { id: ids[index], ...event };
  });
  return eventsList;
}

 const  EventsPages=()=> {
  const [events, setEvents] = useState([]);
  const url = "https://projeto-drn-default-rtdb.firebaseio.com/";
  const resource = "/events";
  useEffect(() => {
    fetch(`${url}/${resource}.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        const convertedList = converter(responseJson);
        setEvents(convertedList);
      });
  }, []);

  return (
    <View style={styles.container}>
      {events ? (
        events.map((event) => <Text key={event.id}>{event.name}</Text>)
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
export default EventsPages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
