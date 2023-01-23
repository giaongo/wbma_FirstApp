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

// const styles = StyleSheet.create({
//   cardImage: {
//     borderBottomLeftRadius: 25,
//   },
//   cardTextBox: {
//     flex: 1,
//     flexGrow: 1,
//     paddingLeft: 15,
//   },
//   cardTextHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   cardTextParagraph: {
//     color: '#a19f9f',
//   },
// });
export default ListItem;
