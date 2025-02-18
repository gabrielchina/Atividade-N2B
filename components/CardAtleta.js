import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CardAtleta = ({ jogador, onFavoritar, onRemover, isFavorite }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: jogador.image }} style={styles.image} />
      <Text style={styles.name}>{jogador.name}</Text>
      <Text style={styles.country}>{jogador.country}</Text>

      {isFavorite ? (
        <TouchableOpacity onPress={() => onRemover(jogador.id)} style={styles.removeButton}>
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => onFavoritar(jogador)} style={styles.favoriteButton}>
          <Text style={styles.buttonText}>Favoritar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: 80, height: 80, borderRadius: 40, marginBottom: 5 },
  name: { fontSize: 16, fontWeight: 'bold' },
  country: { fontSize: 14, color: 'gray' },
  favoriteButton: { backgroundColor: 'green', padding: 5, borderRadius: 5, marginTop: 5 },
  removeButton: { backgroundColor: 'red', padding: 5, borderRadius: 5, marginTop: 5 },
  buttonText: { color: '#fff' },
});

export default CardAtleta;
