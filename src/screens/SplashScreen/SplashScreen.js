/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';

const SplashScreen = ({navigation}) => {
  const onLoad = () => {
    setTimeout(async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === '1') {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    }, 1000);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{height: 100, width: 100, marginVertical: 10}}
          source={require('../../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png')}
        />
        <Text style={styles.text}>Welcome to Assignment</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default SplashScreen;
