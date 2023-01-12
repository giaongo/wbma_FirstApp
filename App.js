import {StatusBar} from 'react-native';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <>
      <Navigator></Navigator>
      <StatusBar backgroundColor={'#ff3300'} />
    </>
  );
};

export default App;
