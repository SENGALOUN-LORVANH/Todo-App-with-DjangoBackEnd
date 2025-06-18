import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useContext(AuthContext);

  const onLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    try {
      await handleLogin({ username, password });
      navigation.navigate('App');
    } catch (error) {
      console.log(error.message);
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter your credentials to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>
          Don’t have an account? <Text style={styles.link}>Register here</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', justifyContent: 'center', paddingHorizontal: 30 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  input: {
    height: 48, backgroundColor: '#fff', borderRadius: 12,
    paddingHorizontal: 16, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', fontSize: 16,
  },
  button: {
    backgroundColor: '#0066FF', paddingVertical: 14,
    borderRadius: 12, alignItems: 'center', marginBottom: 20,
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  linkText: { textAlign: 'center', fontSize: 14, color: '#555' },
  link: { color: '#0066FF', fontWeight: '600' },
});
