import React from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

// eslint-disable-next-line react/prop-types
const List = ({list}) => {
  return (
    <FlatList
      style={{flex: 1, flexDirection: 'column'}}
      data={list}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
