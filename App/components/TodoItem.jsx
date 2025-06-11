import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function TodoItem({ text, onToggle, onDelete }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.icons}>
        <TouchableOpacity onPress={onToggle} style={styles.iconButton}>
          <Feather name="edit" size={24} color="#0066FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
          <Ionicons name="trash" size={24} color="#FF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e6f0fa',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});