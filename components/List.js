import React from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';

const List = ({navigation, myFileOnly = false}) => {
  const {mediaArray} = useMedia(myFileOnly);
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem singleMedia={item} navigation={navigation} />
      )}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object.isRequired,
  myFileOnly: PropTypes.bool,
};
export default List;
