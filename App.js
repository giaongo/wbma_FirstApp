import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView
} from 'react-native';

const App = () => {
  const mediaArray = [
    {
      key: '0',
      title: 'Title 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
      thumbnails: {
        w160: 'http://placekitten.com/160/161',
      },
      filename: 'http://placekitten.com/2048/1920',
    },
    {
      key: '1',
      title: 'Title 2',
      description:
        'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
      thumbnails: {
        w160: 'http://placekitten.com/160/164',
      },
      filename: 'http://placekitten.com/2041/1922',
    },
    {
      key: '2',
      title: 'Title 3',
      description:
        'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
      thumbnails: {
        w160: 'http://placekitten.com/160/167',
      },
      filename: 'http://placekitten.com/2039/1920',
    },
  ];
  return (
    <>
      <SafeAreaView style={styles.AndroidSafeArea}>
        <FlatList
          style={{flex:1,flexDirection:"column"}}
          data={mediaArray}
          renderItem={({item}) => {
            return (
                <TouchableOpacity style={styles.cardContainer}>
                    <Image
                      style={{width:150, height: 280,resizeMode:"cover"}}
                      source={{uri: item.thumbnails.w160}}
                    />
                    <View style={{flex:1,flexGrow:1,paddingLeft:15}}>
                      <Text style={{fontSize:20,fontWeight:"bold"}}>{item.title}</Text>
                      <Text>{item.description}</Text>
                    </View>
                </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex:1,
  },
  cardContainer: {
    backgroundColor:"#e3e3e3",
    marginTop:10,
    padding:15,
    flexDirection:"row",
    justifyContent:"flex-start",
    flex:1
  }
});

export default App;
