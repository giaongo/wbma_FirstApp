import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card, ListItem, Icon} from '@rneui/themed';

const Single = ({route}) => {
  const {title, description, filename, time_added: timeAdded} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Image
          source={{uri: uploadsUrl + filename}}
          style={styles.image}
        />
        <Card.Title>{title}</Card.Title>
        <ListItem>
          <Icon name="photo" />
          <ListItem.Content>
            <ListItem.Title>{description}</ListItem.Title>
            <ListItem.Subtitle>
              {new Date(timeAdded).toLocaleString('fi-FI')}
            </ListItem.Subtitle>
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
