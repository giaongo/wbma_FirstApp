import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({singleMedia}) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Image
        style={{width: 150, height: 150, resizeMode: 'cover'}}
        source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
      />

      <View style={{flex: 1, flexGrow: 1, paddingLeft: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {singleMedia.title}
        </Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#e3e3e3',
    marginTop: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
  },
});
export default ListItem;
