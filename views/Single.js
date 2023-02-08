import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card, ListItem, Icon, Text} from '@rneui/themed';
import {Video} from 'expo-av';
import {useFavourite, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
const Single = ({route}) => {
  const {
    file_id: fileId,
    title,
    description,
    filename,
    time_added: timeAdded,
    media_type: type,
    user_id: userId,
    screenshot,
  } = route.params;
  const video = useRef(null);
  const [owner, setOwner] = useState({});
  const {getUserById} = useUser();
  const [likes, setLikes] = useState([]);
  const {getFavouritesByFileId, postFavourite, deleteFavourite} =
    useFavourite();
  const [userLikesIt, setUserLikesIt] = useState(false);
  const getOwnerInformation = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await getUserById(userId, token);
    setOwner(owner);
  };
  const getLikes = async () => {
    const likes = await getFavouritesByFileId(fileId);
    console.log('likes', likes);
    setLikes(likes);
  };

  const likeFiles = async () => {
    const token = await AsyncStorage.getItem('userToken');
    await postFavourite(fileId, token);
    getLikes();
    setUserLikesIt(true);
  };

  const dislikeFiles = async () => {
    const token = await AsyncStorage.getItem('userToken');
    await deleteFavourite(fileId, token);
    getLikes();
    setUserLikesIt(false);
  };

  const unlock = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.error('unlockError', error);
    }
  };

  const lock = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } catch (error) {
      console.error('lockError', error);
    }
  };

  useEffect(() => {
    getOwnerInformation();
    getLikes();
    unlock();

    return () => {
      lock();
    };
  }, []);

  const showVideoInFullScreen = async () => {
    try {
      if (video) await video.presentFullScreenPlayer();
    } catch (error) {
      console.log('showVideoInFullScreen', error.message);
    }
  };

  return (
    <SafeAreaView>
      <Card>
        <Card.Divider />
        {type === 'image' ? (
          <Card.Image
            source={{uri: uploadsUrl + filename}}
            style={styles.image}
          />
        ) : (
          <Video
            ref={video}
            source={{uri: uploadsUrl + filename}}
            style={{width: '100%', height: '60%'}}
            useNativeControls
            resizeMode="contain"
            isLooping
            onError={(error) => {
              console.log(error);
            }}
            usePoster
            posterSource={{uri: uploadsUrl + screenshot}}
          />
        )}
        <Card.Divider />
        <Card.Title>{title}</Card.Title>
        <ListItem>
          <Icon name="photo" />
          <ListItem.Content>
            {description && <ListItem.Title>{description}</ListItem.Title>}
            <ListItem.Title>
              <Icon name="person" />
              <Text>{owner && owner.username}</Text>
            </ListItem.Title>
            <ListItem.Subtitle>
              {new Date(timeAdded).toLocaleString('fi-FI')}
            </ListItem.Subtitle>
            <ListItem.Title>
              {userLikesIt ? (
                <Icon name="favorite" onPress={dislikeFiles} />
              ) : (
                <Icon name="favorite-border" onPress={likeFiles} />
              )}

              <Text>Likes: {likes.length}</Text>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  image: {
    padding: 0,
    resizeMode: 'cover',
    height: 300,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};
export default Single;
