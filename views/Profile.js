import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Icon, ListItem} from '@rneui/themed';
import React, {useContext, useEffect, useState} from 'react';
import {Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const Profile = () => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(avatarArray.pop());
      console.log(' avatar ', avatar);
    } catch (error) {
      console.log('user avatar fetch failed', error.messsage);
    }
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <Card>
      <Card.Title>{user.username}</Card.Title>
      <Card.Image source={{uri: uploadsUrl + avatar.filename}} />
      <ListItem>
        <Icon name="email"></Icon>
        <ListItem.Title>{user.email}</ListItem.Title>
      </ListItem>
      <ListItem>
        <Icon name="badge"></Icon>
        <ListItem.Title>{user.full_name}</ListItem.Title>
      </ListItem>
      <Button
        title="Logout!"
        onPress={async () => {
          console.log('Loggin out!');
          setUser({});
          setIsLoggedIn(false);
          try {
            await AsyncStorage.clear();
          } catch (error) {
            console.error('clearing asyncstorage failed', error);
          }
        }}
      />
    </Card>
  );
};

export default Profile;
