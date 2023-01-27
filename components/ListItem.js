import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Button, ListItem as RNEListItem} from '@rneui/themed';
const ListItem = ({singleMedia, navigation}) => {
  const item = singleMedia;
  return (
    <RNEListItem bottomDivider>
      <Avatar
        size={80}
        source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
      />
      <RNEListItem.Content>
        <RNEListItem.Title>{singleMedia.title}</RNEListItem.Title>
        <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
      </RNEListItem.Content>
      <Button
        title={'View'}
        onPress={() => {
          navigation.navigate('Single', item);
        }}
        buttonStyle={{
          borderRadius: 5,
        }}
      />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
