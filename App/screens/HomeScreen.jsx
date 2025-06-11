import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import TaskInput from '../components/TaskInput';
import TodoItem from '../components/TodoItem';

export default function HomeScreen() {
  const [todos, setTodos] = useState([
    'This List item that I have added...',
  ]);

  const addTodo = (text) => {
    if (text.trim()) {
      setTodos([...todos, text]);
    }
  };

  const toggleTodo = (index) => {
    console.log('Todo toggled at index:', index);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo-App</Text>
      <Text style={styles.subtitle}>Welcome to our app!</Text>
      <TaskInput onAddTodo={addTodo} />
      <Text style={styles.listTitle}>List to do</Text>
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <TodoItem
            text={item}
            onToggle={() => toggleTodo(index)}
            onDelete={() => deleteTodo(index)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2a5bd7',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  list: {
    flex: 1,
  },
});