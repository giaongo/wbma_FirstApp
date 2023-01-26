import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@rneui/themed';
import {Text} from 'react-native';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const [toggleForm, setToggleForm] = useState(true);
  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) return;
      const userResult = await getUserByToken(userToken);
      if (userResult) {
        setUser(userResult);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error with checking token', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1, padding: 10}}
        activeOpacity={1}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {toggleForm ? <LoginForm /> : <RegisterForm />}
          <Text style={{marginTop: 16}}>
            {toggleForm ? 'No account yet?Please register' : 'Go to login'}
          </Text>
          <Button
            title={toggleForm ? 'Register' : 'Login'}
            onPress={() => {
              setToggleForm(!toggleForm);
            }}
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
            }}
            containerStyle={{
              width: 200,
            }}
          />
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </ScrollView>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
