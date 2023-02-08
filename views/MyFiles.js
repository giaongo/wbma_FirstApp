import {View} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';

const MyFiles = ({navigation}) => {
  return (
    <View>
      <List navigation={navigation} myFileOnly={true} />
    </View>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
