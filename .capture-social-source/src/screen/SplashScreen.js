import React, { useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Welcome'); // Navigate to WelcomeScreen after 5 seconds
    }, 5000); // 5000 ms = 5 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/img1.png')} // Your background image
        style={styles.background}
      >
        <Image source={require('../images/img2.png')} style={styles.logo} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
