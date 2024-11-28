import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await axios.post('http://192.168.87.15:3001/login', {
          email: username, // Assuming `username` is the email
          password,
        });
  
        if (response.status === 200) {
          Alert.alert("Login Successful", `Welcome, ${response.data.user.full_name}!`);
          navigation.navigate('Home');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
        Alert.alert("Error", errorMessage);
      }
    } else {
      Alert.alert("Error", "Please enter both email and password.");
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com');
  };

  const openGmail = () => {
    Linking.openURL('https://mail.google.com');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../img/logo.png')} style={styles.image} />
      <View style={styles.section}>
        <Text style={styles.text}>BikersHub</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.socialLinksContainer}>
          <TouchableOpacity onPress={openFacebook}>
            <Icon name="facebook" size={30} color="#007BFF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={openGmail}>
            <Icon name="google" size={30} color="#DB4437" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.blueText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#F0F4F8',
    top: 20
  },
  image: {
    width: 280,
    height: 190,
    marginBottom: 40,
    borderRadius: 20
  },
  section: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  text: {
    fontSize: 26,
    marginBottom: 20,
    color: '#007BFF',
    fontFamily: 'sans-serif',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#E9F1F5'
  },
  passwordContainer: {
    width: '100%',
    position: 'relative', // To position the icon
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: 12, // Center the icon vertically inside the TextInput
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 10
  },
  button: {
    width: '80%',
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  socialLinksContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  icon: {
    padding: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  signUpText: {
    color: 'black',
    fontSize: 16
  },
  blueText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
