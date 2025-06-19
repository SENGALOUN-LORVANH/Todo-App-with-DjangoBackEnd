import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskInput({ onAddTask }) {
  const [formData, setFormData] = useState({ title: '', description: '', completed: false });

  const handleAddTask = () => {
    if (formData.title.trim()) {
      onAddTask(formData);
      setFormData({ title: '', description: '', completed: false });
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Add Task</Text>
      <TextInput
        style={styles.input}
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
        placeholder="Task title"
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        placeholder="Description (optional)"
        placeholderTextColor="#888"
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Ionicons name="add-circle-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 5,
    marginVertical: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  textarea: {
    height: 70,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
});
