import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import Routes from './routes';

const AboutPage = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nossa Empresa</Text>
      <Text style={styles.text}>
        Somos uma empresa comprometida com a excelência no serviço ao cliente, oferecendo os melhores produtos e serviços do mercado. Fundada em [ano de fundação], temos orgulho de nossa trajetória e da confiança que nossos clientes depositam em nós.
      </Text>
      
      <Text style={styles.title}>Nossa Diretoria</Text>
      <Text style={styles.text}>
        Nossa diretoria é composta por profissionais com vasta experiência em suas áreas de atuação, comprometidos em liderar a empresa com visão de futuro e inovação.
      </Text>
      
      <Text style={styles.title}>Nossos Colaboradores</Text>
      <Text style={styles.text}>
        Contamos com uma equipe de colaboradores altamente qualificados, dedicados a oferecer o melhor atendimento e suporte aos nossos clientes. Nossa equipe é o coração da nossa empresa.
      </Text>
      
      <Text style={styles.contact}>+55 21 85 9 9964-7850</Text>
      
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate(Routes.EventsListPage);
        }}
      >
        <Text style={styles.buttonText}>Eventos</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 24,
  },
  contact: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    marginTop: 20,
    marginBottom: 50, 
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default AboutPage;
