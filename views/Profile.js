import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Icon, ListItem} from '@rneui/themed';
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import ProfileForm from '../components/ProfileForm';
import {MainContext} from '../contexts/MainContext';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';

const Profile = () => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');
  const [showModifyForm, setShowModifyForm] = useState(false);

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
    <ScrollView>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
            <Button
              title={showModifyForm ? 'Close Modify Form' : 'Modify Profile'}
              onPress={() => {
                setShowModifyForm(!showModifyForm);
              }}
            />
          </Card>
          {showModifyForm ? <ProfileForm user={user} /> : <View></View>}
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
