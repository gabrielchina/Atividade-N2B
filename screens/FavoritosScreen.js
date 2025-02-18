import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavoritos } from '../context/FavoritosContext';

const FavoritosScreen = () => {
  const { favoritos, removeFavorito } = useFavoritos();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogadores Favoritos</Text>

      {favoritos.length === 0 ? (
        <Text style={styles.empty}>Nenhum jogador favoritado ainda.</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
              <Text style={styles.name}>{item.fullname} ({item.nickname})</Text>
              <TouchableOpacity onPress={() => removeFavorito(item.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  empty: { fontSize: 16, color: 'gray', textAlign: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  name: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  image: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
});

export default FavoritosScreen;
