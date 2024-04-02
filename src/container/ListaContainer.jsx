import {  View, StyleSheet, FlatList } from "react-native";
import EventCard from "../component/EventCard";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";




const ListaContainer = ({ events, action }) => {
  const [pesquisar, setPesquisar] = useState("");
  const [resultadoPesquisa, setResultadoPesquisa] = useState(events);

  useEffect(() => {
    handlePesquisar();
  }, [pesquisar, events]);

  const handlePesquisar = () => {
    const formato = pesquisar.toLowerCase();
    const filteredData = events.filter(event => {
      return contains(event, formato);
    });
    setResultadoPesquisa(filteredData);
  };

  const contains = ({ name, description }, text) => {
    return name.toLowerCase().includes(text) || description.toLowerCase().includes(text);
  };



  function renderCard({ item }) {
    return <EventCard item={item} action={action} />;
  }



    return (
      <View>
 <View style={styles.inputContainer}>
        <TextInput
          label="Pesquisar"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.pesquisar}
          value={pesquisar}
          onChangeText={(text) => setPesquisar(text)}
          right={
            <TextInput.Icon
              onPress={handlePesquisar}
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="magnify"
                  color={color}
                  size={size}
                />
              )}
              color="#ccc"
            />
          }
        />
      </View>

      <FlatList
        style={styles.container}
        data={resultadoPesquisa.length > 0 ? resultadoPesquisa : data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
      />
      </View>
    
    );
  
};
 

export default ListaContainer;

const styles = StyleSheet.create({
  container: {

    padding: 5,
    backgroundColor: "#f7ede2",
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, 
  },
  emptyText: {
    fontSize: 18, 
    color: '#6e6e6e', 
  },
});
