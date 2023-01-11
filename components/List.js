import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';

const List = () => {
  const url =
    'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (e) {
      console.log('error', e);
    }
  };
  useEffect(() => {
    loadMedia().then((data) => {
      setMediaArray(data);
    });
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
