/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [mobile, setMobile] = useState('');

  // Handle user state changes
  const onAuthStateChanged = user => {
    console.log('user : ', user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  const signInWithPhoneNumber = async () => {
    try {
      if (mobile.length === 10) {
        console.warn('phoneNumber :', mobile);
        const confirmation = await auth().signInWithPhoneNumber(`+91${mobile}`);
        console.warn('confirmation :', confirmation);
        setConfirm(confirmation);
      } else {
        Alert.alert('Please enter valid Mobile Number');
      }
    } catch (error) {
      console.log('error :', error);
    }
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      await AsyncStorage.setItem('isLoggedIn', '1');
      Alert.alert('Login Successfull :)');
      navigation.navigate('Home');
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {!confirm ? (
          <View>
            <TextInput
              value={mobile}
              placeholder="Enter Your Mobile Number"
              keyboardType="phone-pad"
              onChangeText={text => setMobile(text)}
              style={styles.txtinput}
            />
            <TouchableOpacity
              onPress={() => signInWithPhoneNumber()}
              style={styles.btn}>
              <Text style={styles.btn_text}>Send OTP</Text>
            </TouchableOpacity>
            {/* <Button title="Send OTP" onPress={() => confirmCode()} /> */}
          </View>
        ) : (
          //   <Button
          //     title="Phone Number Sign In"
          //     onPress={() => signInWithPhoneNumber('+918200951131')}
          //   />
          <View>
            <TextInput
              style={styles.txtinput}
              placeholder="Verification Code"
              keyboardType="phone-pad"
              value={code}
              onChangeText={text => setCode(text)}
            />
            <Button title="Submit Code" onPress={() => confirmCode()} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  txtinput: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    borderColor: 'skyblue',
  },
  btn: {
    padding: 10,
    backgroundColor: 'skyblue',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignSelf: 'center',
  },
  btn_text: {fontSize: 14, fontWeight: '700', color: 'white'},
});
