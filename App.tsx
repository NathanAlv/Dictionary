import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchBar from './src/components/SearchBar/index';
import TermDetails from './src/components/TermDetails';

interface AppProps {
  navigation: any;
}

const App: React.FC<AppProps> = ({ navigation }) => {
  const [term, setTerm] = useState<string>('');
  const [definition, setDefinition] = useState<string>('');

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(
        `https://seu-servidor-api.com/api/definicoes/${query}`
      );

      const { termo, definicao } = response.data;
      setTerm(termo);
      setDefinition(definicao);

      // Navegar para a tela de detalhes
      navigation.navigate('Details', {
        term: termo,
        definition: definicao,
      });
    } catch (error) {
      console.error('Erro ao buscar definição', error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <TermDetails term={term} definition={definition} />
    </View>
  );
};

interface DetailsScreenProps {
  navigation: any;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TermDetails
        term={navigation.getParam('term', 'N/A')}
        definition={navigation.getParam('definition', 'N/A')}
      />
    </View>
  );
};

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
