import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskInput({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    onAddTodo(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add Todo List"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
        <Ionicons name="add" size={24} color="#0066FF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    marginLeft: 10,
    padding: 8,
  },
});