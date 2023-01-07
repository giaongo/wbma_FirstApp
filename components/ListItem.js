import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity,Image,View,Text,Modal} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({singleMedia}) => {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <TouchableOpacity 
        style={styles.cardContainer}
        onPress={() => setModalVisible(!modalVisible)}>
      <Image
        style={{width: 150, height: 280, resizeMode: 'cover'}}
        source={{uri: singleMedia.thumbnails.w160}}/>

      <View style={{flex: 1, flexGrow: 1, paddingLeft: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>

      <Modal 
            animationType = "none"
            transparent={true}
            visible={modalVisible}>
            <View>
                <Text style={{fontWeight:"bold",backgroundColor:"red",color:"white"}}>{singleMedia.filename}</Text>
            </View>
        </Modal>

    </TouchableOpacity>
  );
};

ListItem.propTypes = {
    singleMedia:PropTypes.object
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#e3e3e3',
    marginTop: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
  },
});
export default ListItem;
