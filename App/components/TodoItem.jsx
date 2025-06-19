import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function TodoItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || '',
    completed: task.completed,
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    const updatedTask = { ...formData, completed: !formData.completed };
    setFormData(updatedTask);
    onUpdate(task.id, updatedTask);
  };

  const handleUpdate = () => {
    onUpdate(task.id, formData);
    setIsEditing(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.taskContent}>
          <Text style={styles.text}>{task.title}</Text>
          {task.description ? (
            <Text style={styles.description}>{task.description}</Text>
          ) : null}
          <Text style={[styles.status, task.completed ? styles.completed : styles.notCompleted]}>
            {task.completed ? 'Completed' : 'Not Completed'}
          </Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={handleToggle} style={styles.iconButton}>
            <Feather
              name={task.completed ? 'check-square' : 'square'}
              size={24}
              color="#0066FF"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.iconButton}>
            <Feather name="edit" size={24} color="#0066FF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.iconButton}>
            <Ionicons name="trash" size={24} color="#FF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Popup */}
      <Modal
        visible={isEditing}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsEditing(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalWrapper}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(text) => handleChange('title', text)}
              placeholder="Title"
            />
            <TextInput
              style={[styles.input, styles.textarea]}
              value={formData.description}
              onChangeText={(text) => handleChange('description', text)}
              placeholder="Description"
              multiline
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
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
  taskContent: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    marginTop: 4,
  },
  completed: {
    color: 'green',
  },
  notCompleted: {
    color: 'red',
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

  // Modal styles
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  textarea: {
    height: 80,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#0066FF',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF4444',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
