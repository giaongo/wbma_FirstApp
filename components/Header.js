import React from 'react';
import {ImageBackground, View, Text, StyleSheet} from 'react-native';
import {Settings} from 'react-native-feather';
import puppyImage from '../assets/puppy.jpg';

const Header = () => {
  return (
    <View style={styles.banner}>
      <ImageBackground
        source={puppyImage}
        resizeMode="cover"
        style={styles.backgroundImg}
        borderBottomRightRadius="30"
      >
        <Text style={styles.bannerText}>Homeless Kittens</Text>
        <Settings style={styles.settingIcon} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 150,
    position: 'relative',
    padding: 10,
  },
  backgroundImg: {
    flex: 1,
  },
  bannerText: {
    position: 'absolute',
    left: 0,
    bottom: 10,
    color: 'white',
    backgroundColor: 'blue',
  },
  settingIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: 'white',
  },
});
export default Header;
