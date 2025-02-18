import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícones para busca e favoritos
import { useFavoritos } from '../context/FavoritosContext'; // Importando o contexto de favoritos

const SearchAtletas = () => {
  const [jogadores, setJogadores] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { favoritos, addFavorito, removeFavorito } = useFavoritos(); // Funções do contexto

  const handleSearch = async () => {
    if (!query.trim()) return; // Evita pesquisas vazias

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://hltv-api.vercel.app/api/player.json');
      if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);

      const teams = await response.json();

      // Filtrar os jogadores pelo nome pesquisado
      const matchedPlayers = teams.flatMap(team =>
        team.players
          .filter(player => player.fullname?.toLowerCase().includes(query.toLowerCase()))
          .map(player => ({
            id: `${team.name}-${player.nickname}`, // Criando um ID único
            fullname: player.fullname || 'Nome desconhecido',
            nickname: player.nickname,
            image: player.image || null,
            country: player.country?.name || 'Desconhecido',
            flag: player.country?.flag || null,
          }))
      );

      setJogadores(matchedPlayers);
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar jogador"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.error}>Erro: {error}</Text>}
      {loading && <Text style={styles.loading}>Carregando...</Text>}

      {/* Lista de Jogadores */}
      <FlatList
        data={jogadores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isFavorite = favoritos.some(fav => fav.id === item.id); // Verifica se está nos favoritos
          return (
            <View style={styles.card}>
              {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
              <Text style={styles.name}>{item.fullname} ({item.nickname})</Text>
              <Text style={styles.country}>{item.country}</Text>
              {item.flag && <Image source={{ uri: item.flag }} style={styles.flag} />}
              
              {/* Botão de Favoritar */}
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => (isFavorite ? removeFavorito(item.id) : addFavorito(item))}
              >
                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color="red" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  error: { color: 'red', marginVertical: 5 },
  loading: { color: 'blue', marginVertical: 5 },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  country: { fontSize: 14, color: 'gray' },
  image: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  flag: { width: 30, height: 20, marginLeft: 5 },
  favoriteButton: { padding: 5 },
});

export default SearchAtletas;
