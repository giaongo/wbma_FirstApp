import {StatusBar} from 'react-native';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <MainProvider>
      <Navigator></Navigator>
      <StatusBar backgroundColor={'#ff3300'} />
    </MainProvider>
  );
};

export default App;
