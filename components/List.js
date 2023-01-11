import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {baseUrl} from '../utils/variables';
import ListItem from './ListItem';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();
      const media = await Promise.all(
        json.map(async (file) => {
          const response = await fetch(baseUrl + 'media/' + file.file_id);
          return await response.json();
        })
      );
      setMediaArray(media);
    } catch (e) {
      console.error('error', e);
    }
  };
  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <FlatList
      style={{flex: 1, flexDirection: 'column'}}
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
