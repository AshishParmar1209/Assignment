/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {FAB} from 'react-native-paper';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const resp = await Axios.get('https://fakestoreapi.com/products');
    console.warn(resp.data);
    setProducts(resp.data);
  };

  const doUserLogOut = async () => {
    try {
      AsyncStorage.clear();
      navigation.dispatch(StackActions.popToTop());
    } catch (error) {
      console.log('error :', error);
    }
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Map')}>
      <View>
        <Image
          source={{uri: item.image}}
          style={{
            height: SCREEN_HEIGHT / 6,
            width: SCREEN_HEIGHT / 6,
            borderRadius: 12,
            marginTop: 8,
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            borderRadius: 12,
            // alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={2}
            style={{
              color: 'grey',
              fontSize: 14,
              marginTop: 8,
              marginHorizontal: 4,
              margin: 8,
            }}>
            {item.category}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '700',
              flex: 1,
              margin: 4,
            }}>
            {item.title}
          </Text>
          <Text
            // numberOfLines={2}
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '700',
              // flex: 1,
              margin: 4,
            }}>
            {'$' + item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.HeaderContainer}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.headertxt}>Home</Text>
          </View>

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={styles.font2}>Logout</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={{justifyContent: 'center', marginVertical: 10}}>
          <Text style={styles.headertxt}>Products : </Text>
        </View>
        <FlatList
          contentContainerStyle={{marginHorizontal: 8}}
          data={products}
          numColumns={2}
          renderItem={renderItem}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('AddProduct')}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  HeaderContainer: {
    flexDirection: 'row',
    // marginHorizontal: 20,
    backgroundColor: 'white',
    height: 57,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    // borderBottomWidth: 0.5,
    borderRadius: 12,
    // marginTop: 10,
  },
  headertxt: {
    fontSize: 17,
    fontWeight: '700',
    color: 'black',
    // textAlign: 'center',
    marginHorizontal: 20,
  },
  font2: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    marginHorizontal: 20,
  },
  card: {
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
    // backgroundColor: Colors.WHITE,
    backgroundColor: 'white',
    borderRadius: 12,
    height: SCREEN_HEIGHT / 3.5,
    // width: SCREEN_WIDTH / 2 - 50,
    margin: 8,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    color: 'skyblue',
  },
});
