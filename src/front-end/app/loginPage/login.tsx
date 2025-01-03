
import React, { useState } from 'react';
import {Text, View, TextInput, TouchableOpacity, Image, Pressable } from 'react-native';
import styles from './style';
import {Stack, useRouter, Navigator, router, Link} from 'expo-router';
import axios from "axios";
import SHA256 from 'crypto-js/sha256';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { PlayFabClient } from 'playfab-sdk';



export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const frontendRouter = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const hashedPassword = SHA256(password).toString();
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: email,
        password: hashedPassword,
      });
      if (response.status === 200) {
        const jwtToken = response.data.jwttok;
        console.log('JWT Token:', jwtToken);
  
        // 存入 SecureStore
        await AsyncStorage.setItem('jwtToken', jwtToken);
        // await SecureStore.setItemAsync('jwtToken', jwtToken);
        console.log('Token saved to asyncstorage');
        frontendRouter.navigate('/(tabs)/home')
      }
      else if (response.status === 401) {
        // Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
        // window.alert('Login Failed Invalid email or password. Please try again.')
        console.log("登入錯誤：")
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  const handleGoogleLogin = async() => {
    await console.log("E04");
  }
  
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back to GroupUp</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor="#bdbdbd"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            placeholderTextColor="#bdbdbd"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIconContainer}
          >
            <Text style={styles.eyeIcon}>{passwordVisible ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Keep me logged in & Forgot Password */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity>
          <Text style={styles.optionText}>Keep me logged in</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.optionText, styles.forgotPassword]}>Forget Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton } onPress={function(){ handleLogin(email, password) }}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>


      {/* Social Media Login */}
      {/* <View style={styles.socialContainer}>
        <View style={styles.divider}>
          <Text style={styles.dividerText}>or sign in with</Text>
        </View>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => {console.log("Apple login")}}>
            <AntDesign name="apple1" size={24} color="black"  />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {console.log("fb login")}}>
          <AntDesign name="facebook-square" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>  handleGoogleLogin() }>
            <AntDesign name="google" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View> */}

      {/* Create Account */}
      <Link href="loginPage/createAccount" asChild>
      <TouchableOpacity>
        <Text style={styles.createAccount}>Create an Account</Text>
      </TouchableOpacity>
      </Link> 
        
      
    </View>
  );    
}