import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview'; // Importando WebView
import { useFavoritos } from '../context/FavoritosContext';
import CardAtleta from '../components/CardAtleta';
import SearchAtletas from '../components/SearchAtletas';

const HomeScreen = () => {
  const [jogadores, setJogadores] = useState([]);
  const [pesquisado, setPesquisado] = useState(false);
  const { addFavorito } = useFavoritos();

  return (
    <View style={styles.container}>
      <SearchAtletas setJogadores={setJogadores} setPesquisado={setPesquisado} />

      {/* Vídeo do YouTube */}
      <View style={styles.videoContainer}>
        <WebView 
          source={{ uri: "https://www.youtube.com/embed/SkPSAjCaYPQ" }} 
          style={styles.video}
        />
      </View>

      {pesquisado && jogadores.length === 0 && (
        <Text style={styles.noResults}>Nenhum jogador encontrado.</Text>
      )}

      {pesquisado && jogadores.length > 0 && (
        <FlatList
          data={jogadores}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CardAtleta atleta={item} adicionarAosFavoritos={addFavorito} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  videoContainer: {
    width: '100%',
    height: Dimensions.get('window').width * 0.56, // Mantém proporção 16:9
    marginBottom: 20,
  },
  video: {
    flex: 1,
  },
  noResults: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
});

export default HomeScreen;
