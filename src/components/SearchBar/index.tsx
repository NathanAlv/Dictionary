import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <View>
      <TextInput
        placeholder="Pesquisar termo jurídico..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Buscar" onPress={handleSearch} />
    </View>
  );
};

export default SearchBar;
