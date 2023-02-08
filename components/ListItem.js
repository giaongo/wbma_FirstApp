import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils/variables';
import {
  Avatar,
  Button,
  ButtonGroup,
  ListItem as RNEListItem,
} from '@rneui/themed';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';

const ListItem = ({singleMedia, navigation}) => {
  const item = singleMedia;
  const {user, update, setUpdate} = useContext(MainContext);
  const {deleteMedia} = useMedia();
  const doDelete = () => {
    try {
      Alert.alert('Delete', 'this file permanently', [
        {text: 'Cancel'},
        {
          text: 'OK',
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(item.file_id, token);
            response && setUpdate(!update);
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <RNEListItem bottomDivider>
      <Avatar
        size={80}
        source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
      />
      <RNEListItem.Content>
        <RNEListItem.Title>{singleMedia.title}</RNEListItem.Title>
        <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
        {item.user_id === user.user_id && (
          <ButtonGroup
            buttons={['Modify', 'Delete']}
            rounded
            onPress={async (index) => {
              if (index === 0) {
                navigation.navigate('Modify', {file: item});
              } else {
                doDelete();
              }
            }}
          />
        )}
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
