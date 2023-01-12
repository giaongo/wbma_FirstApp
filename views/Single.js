import React from 'react';
import {SafeAreaView, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
const Single = ({route}) => {
  const {title, description, filename, time_added: timeAdded} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{title}</Text>
      <Image source={{uri: uploadsUrl + filename}} style={styles.image} />
      <Text>{description}</Text>
      <Text>{timeAdded}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: 200,
    height: 300,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};
export default Single;
