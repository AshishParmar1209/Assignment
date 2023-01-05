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
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      if (mobile.length === 10) {
        console.warn('phoneNumber :', mobile);
        const confirmation = await auth().signInWithPhoneNumber(`+91${mobile}`);
        console.warn('confirmation :', confirmation);
        setIsLoading(false);
        setConfirm(confirmation);
      } else {
        setIsLoading(false);
        Alert.alert('Please enter valid Mobile Number');
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error : ', error);
      console.log('error :', error);
    }
  };

  const confirmCode = async () => {
    try {
      setIsLoading(true);
      await confirm.confirm(code);
      await AsyncStorage.setItem('isLoggedIn', '1');
      setIsLoading(false);
      Alert.alert('Login Successfull :)');
      navigation.navigate('Home');
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error : ', error);
      console.log('Invalid code.');
    }
  };

  const customLoader = () => {
    return (
      isLoading && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            zIndex: 2,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          size="large"
          visible={isLoading}
        />
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {customLoader()}
        {!confirm ? (
          <View
            style={{
              paddingHorizontal: 20,
              elevation: 8,
              backgroundColor: 'white',
              marginHorizontal: 20,
              borderRadius: 13,
            }}>
            <Text style={{fontSize: 20, fontWeight: '700', marginVertical: 8}}>
              OTP Authentication
            </Text>
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
          <View
            style={{
              paddingHorizontal: 20,
              elevation: 8,
              backgroundColor: 'white',
              marginHorizontal: 20,
              borderRadius: 13,
            }}>
            <Text style={{fontSize: 20, fontWeight: '700', marginVertical: 8}}>
              OTP Authentication
            </Text>
            <TextInput
              style={styles.txtinput}
              placeholder="Verification Code"
              keyboardType="phone-pad"
              value={code}
              onChangeText={text => setCode(text)}
            />
            <TouchableOpacity style={styles.btn} onPress={() => confirmCode()}>
              <Text style={styles.btn_text}>Submit Code</Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
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
