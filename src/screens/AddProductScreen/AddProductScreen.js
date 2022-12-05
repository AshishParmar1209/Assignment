import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Axios from 'axios';
import {Button} from 'react-native-paper';

const AddProductScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitProduct = async () => {
    try {
      setIsLoading(true);
      const request = {
        title: title,
        price: price,
        description: desc,
        image: imgURL,
        category: category,
      };
      const resp = await Axios.post(
        'https://fakestoreapi.com/products',
        request,
      );
      setIsLoading(false);
      Keyboard.dismiss();
      navigation.navigate('Detail', {data: resp.data});
      console.warn(resp.data);
    } catch (error) {
      setIsLoading(false);
      console.log('error :', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <TextInput
            value={title}
            placeholder="Enter Product Title"
            onChangeText={text => setTitle(text)}
            style={styles.txtinput}
          />
          <TextInput
            value={price}
            placeholder="Enter Price"
            keyboardType="decimal-pad"
            onChangeText={text => setPrice(text)}
            style={styles.txtinput}
          />
          <TextInput
            value={desc}
            placeholder="Enter Description"
            onChangeText={text => setDesc(text)}
            style={styles.txtinput}
          />
          <TextInput
            value={imgURL}
            placeholder="Enter Image URL"
            onChangeText={text => setImgURL(text)}
            style={styles.txtinput}
          />
          <TextInput
            value={category}
            placeholder="Enter Category"
            onChangeText={text => setCategory(text)}
            style={styles.txtinput}
          />
          <View style={styles.btnContainer}>
            <Button
              loading={isLoading}
              mode="contained"
              onPress={() => submitProduct()}>
              Submit
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddProductScreen;

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
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});
