import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const handleBioPress = () => {
    console.log('Navigating to Bio edit screen...');
  };

  const handleChangePasswordPress = () => {
    console.log('Navigating to Change Password screen...');
  };

  const handleLogoutPress = () => {
    console.log('Logging out...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="person-circle-outline" size={80} color="#0066FF" />
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>Same smith</Text>
      <Text style={styles.email}>Same99@gmail.com</Text>

      <TouchableOpacity style={styles.option} onPress={handleBioPress}>
        <Text style={styles.optionText}>Bio</Text>
        <Ionicons name="chevron-forward" size={20} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleChangePasswordPress}>
        <Text style={styles.optionText}>Change password</Text>
        <Ionicons name="chevron-forward" size={20} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0066FF',
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF4444',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 40,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});