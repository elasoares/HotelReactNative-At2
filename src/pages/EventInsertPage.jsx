import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Pressable, ScrollView} from "react-native";
import { Picker } from "@react-native-picker/picker";

const EventInsertPage = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [dateDay, setDateDay] = useState("1");
  const [dateMonth, setDateMonth] = useState("1");
  const [dateYear, setDateYear] = useState("2022");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const url = "https://projetoatpb-default-rtdb.firebaseio.com/";
  const resource = "events";

  const days = [];
  const months = [];
  const years = [];
  for (let i = 1; i <= 31; i++) {
    days.push({ value: i, label: i.toString() });
  }
  for (let i = 1; i <= 12; i++) {
    months.push({ value: i, label: i.toString() });
  }
  for (let i = 1900; i <= 2100; i++) {
    years.push({ value: i, label: i.toString() });
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Título"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        placeholder="Descrição"
      />
      <TextInput
        value={location}
        onChangeText={setLocation}
        style={styles.input}
        placeholder="Localização"
      />

      <View style={styles.dateInputContainer}>
        <View style={styles.tituloPicker}>
          <Text style={styles.dateLabel}>Dia</Text>
          <Text style={styles.dateLabel}>Mês</Text>
          <Text style={styles.dateLabel}>Ano</Text>
        </View>
        <View style={styles.containerPicker}>
          <Picker
            selectedValue={dateDay}
            onValueChange={setDateDay}
            style={styles.dateInputPicker}
          >
            {days.map((day) => (
              <Picker.Item key={day.value} label={day.label} value={day.value} />
            ))}
          </Picker>

          <Picker
            selectedValue={dateMonth}
            onValueChange={setDateMonth}
            style={styles.dateInputPicker}
          >
            {months.map((month) => (
              <Picker.Item key={month.value} label={month.label} value={month.value} />
            ))}
          </Picker>

          <Picker
            selectedValue={dateYear}
            onValueChange={setDateYear}
            style={styles.dateInputPicker}
          >
            {years.map((year) => (
              <Picker.Item key={year.value} label={year.label} value={year.value} />
            ))}
          </Picker>
        </View>
      </View>

      <TextInput
         style={styles.input}
        value={date.toString()}
        onChangeText={(text)=> setdate(text)}
        placeholder="date"
        />

      <TextInput
        value={price}
        onChangeText={(text) => setPrice(text)}
        style={styles.input}
        placeholder="Preço"
        keyboardType="decimal-pad"
      />

      <Pressable
        style={styles.botaoSalvar}
        onPress={() => {
          setIsLoading(true); 
          const newEvent = {
            name: name,
            location: location,
            price: Number.parseFloat(price),
            description: description,
            date: new Date(dateYear, dateMonth - 1, dateDay), 
          };
          fetch(`${url}/${resource}.json`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
          })
            .then((response) => response.json())
            .then((date)=> {
              console.warn(date)
      setMsg("Evento criado com sucesso! ID: " + data.name); 
      setIsLoading(false); 
    })
            .catch((error) => {
       setMsg("Erro ao criar evento: " + error.message);
      setIsLoading(false); 
    });
        }}
      >
        <Text style={{ color: "#fff" }}>Salvar</Text>
      </Pressable>

      
    </ScrollView>
  );
};

export default EventInsertPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
   
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  dateInputContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  tituloPicker: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  containerPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInputPicker: {
    flex: 1,
    fontSize: 12,
  },
  botaoSalvar: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 50,
  },
  botaoSalvarTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
