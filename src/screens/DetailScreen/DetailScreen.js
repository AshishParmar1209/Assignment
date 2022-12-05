/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const DetailScreen = ({route}) => {
  const data = route.params.data;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {data && data.image && (
          <Image
            source={{uri: data.image}}
            style={{
              height: SCREEN_WIDTH / 2,
              width: SCREEN_WIDTH / 2,
              margin: 8,
            }}
          />
        )}
        {data && data.category && (
          <Text style={{fontSize: 13, color: 'grey', margin: 8}}>
            {'Category : ' + data.category}
          </Text>
        )}
        {data && data.title && (
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: '700',
              margin: 8,
            }}>
            {data.title}
          </Text>
        )}
        {data && data.price && (
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontWeight: '700',
              margin: 8,
            }}>
            {'Price : ' + data.price}
          </Text>
        )}
        {data && data.description && (
          <Text style={{fontSize: 14, color: 'black', margin: 8}}>
            {'Description : ' + data.description}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
