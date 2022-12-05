/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Platform,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {enableLatestRenderer} from 'react-native-maps';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const MapScreen = () => {
  //   const initialRegion = {
  //     latitude: 37.78825,
  //     longitude: -122.4325,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   };
  //   const mapRef = React.useRef(null);

  //   const [mapRegion, setMapRegion] = React.useState(initialRegion);
  const [position, setPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4325,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const requestPermission = async () => {
    const isAndroid = Platform.OS === 'android';

    if (isAndroid) {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      // console.log("result", result);
      if (result) {
        getLocation();
      } else {
        const isGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (isGranted == PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        }
      }
    } else {
      await request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
        if (result == 'granted') {
          getLocation();
        }
      });
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos);
        const crd = pos.coords;
        setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        // setLocation(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    // console.log(location);
  };

  useEffect(() => {
    requestPermission();
    enableLatestRenderer();
  }, []);

  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={styles.mapContainer}>
      {/* <MapView
          style={{flex: 1}}
          //   initialRegion={{
          //     latitude: 37.78825,
          //     longitude: -122.4324,
          //     latitudeDelta: 0.0922,
          //     longitudeDelta: 0.0421,
          //   }}
          showsUserLocation={true}
          //   followUserLocation={true}
          initialRegion={mapRegion}
          //   onRegionChangeComplete={reg => setMapRegion(reg)}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          //   customMapStyle={true ? mapStandardSilverStyle : mapStandardStyle}
          //   zoomEnabled
        /> */}
      <MapView
        style={styles.map}
        initialRegion={position}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}>
        <Marker
          title="Yor are here"
          //  description='This is a description'
          coordinate={position}
        />
      </MapView>
    </View>
    // </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 0.7,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#e4e4e4',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
