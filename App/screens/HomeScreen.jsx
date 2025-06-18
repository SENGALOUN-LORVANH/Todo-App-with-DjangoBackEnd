import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import TaskInput from '../components/TaskInput';
import TodoItem from '../components/TodoItem';
import { getTasks, createTask, deleteTask as deleteTaskAPI } from '../services/api';

export default function HomeScreen() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTodos(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const addTodo = async (text) => {
    if (text.trim()) {
      try {
        const res = await createTask({ title: text });
        setTodos([...todos, res.data]);
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    }
  };

  const deleteTodo = async (index) => {
    const task = todos[index];
    try {
      await deleteTaskAPI(task.id);
      setTodos(todos.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
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
            text={item.title}
            onToggle={() => {}}
            onDelete={() => deleteTodo(index)}
          />
        )}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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
