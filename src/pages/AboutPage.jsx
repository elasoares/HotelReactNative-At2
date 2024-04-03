import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const AboutPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>
      <Text style={styles.text}>
        Este aplicativo foi desenvolvido para proporcionar uma experiência incrível aos usuários na busca por hotéis e eventos emocionantes.
      </Text>
      <Text style={styles.subtitle}>Desenvolvimento do App</Text>
      <Text style={styles.text}>
        O aplicativo foi desenvolvido utilizando tecnologias modernas e melhores práticas de desenvolvimento de aplicativos móveis. Utilizamos o framework React Native, que nos permitiu criar uma experiência de usuário fluida e consistente em diferentes plataformas móveis.
      </Text>
      <Text style={styles.text}>
        Nosso processo de desenvolvimento foi ágil, com iterações frequentes e feedback contínuo dos usuários. Isso nos permitiu ajustar e aprimorar o aplicativo ao longo do tempo, garantindo uma experiência de alta qualidade para nossos usuários.
      </Text>
      <Text style={styles.text}>
        Além disso, o aplicativo utiliza serviços em nuvem para armazenamento de dados, como Firebase, garantindo segurança, escalabilidade e confiabilidade.
      </Text>
      <Text style={styles.subtitle}>Desenvolvedores</Text>
      <Text style={styles.text}>
        Este aplicativo foi desenvolvido por uma equipe talentosa de desenvolvedores apaixonados pela criação de soluções inovadoras. Entre em contato conosco para saber mais sobre nossos desenvolvedores:
      </Text>
      <Text style={styles.text}>
        - Elaine Soares (elaine@example.com)
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center"
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AboutPage;
