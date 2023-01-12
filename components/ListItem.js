import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('Single');
      }}
    >
      <Image
        style={styles.cardImage}
        source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
      />

      <View style={styles.cardTextBox}>
        <Text style={styles.cardTextHeader}>{singleMedia.title}</Text>
        <Text style={styles.cardTextParagraph}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'rgba(56,56,56,0.5)',
    marginTop: 10,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    marginHorizontal: 10,
  },
  cardImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderBottomLeftRadius: 25,
  },
  cardTextBox: {
    flex: 1,
    flexGrow: 1,
    paddingLeft: 15,
  },
  cardTextHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cardTextParagraph: {
    color: '#a19f9f',
  },
});
export default ListItem;
