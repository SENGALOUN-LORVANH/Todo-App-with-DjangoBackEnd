import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import TaskInput from '../components/TaskInput';
import TodoItem from '../components/TodoItem';
import { AuthContext } from '../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const addTask = async (taskData) => {
    try {
      await createTask(taskData);
      setError('');
      fetchTasks();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const updateExistingTask = async (id, taskData) => {
    try {
      await updateTask(id, taskData);
      setError('');
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteExistingTask = async (id) => {
    try {
      await deleteTask(id);
      setError('');
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <Text style={styles.subtitle}>Welcome to our app!</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TaskInput onAddTask={addTask} />
      <Text style={styles.listTitle}>Tasks</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TodoItem
            task={item}
            onUpdate={updateExistingTask}
            onDelete={deleteExistingTask}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
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
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});