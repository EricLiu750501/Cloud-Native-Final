
import React, { useState } from 'react';
import {Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './style.ts';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from '../../node_modules/expo-router/build/exports.d.ts';

export default function createAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>Welcome to join GroupUp !</Text>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="#bdbdbd"
          keyboardType="email-address"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

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
        {/* <TouchableOpacity>
          <Text style={styles.optionText}>Keep me logged in</Text>
        </TouchableOpacity> */}
        <TouchableOpacity>
          <Text style={[styles.optionText, styles.forgotPassword]}>Forget Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Sign up Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Social Media Login */}
      <View style={styles.socialContainer}>
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
          <TouchableOpacity onPress={() => {console.log("google  login")}}>
            <AntDesign name="google" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Create Account */}
      <Link href="loginPage/login" asChild>
      <TouchableOpacity>
        <Text style={styles.createAccount}>Already have an account ?</Text>
      </TouchableOpacity>
      </Link>
     
    </View>
  );
}

