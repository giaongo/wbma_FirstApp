import React, {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, Button, View, TextInput} from 'react-native';
import {useAuthentication} from '../hooks/ApiHooks';
import {Controller, useForm} from 'react-hook-form';

const LoginForm = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const logIn = async (loginData) => {
    console.log('Button pressed', loginData);
    // const data = {username: 'giao', password: 'giao12345'};
    try {
      const loginResult = await postLogin(loginData);
      console.log('logIn', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error with login', error);
    }
  };

  return (
    <View>
      <Text>Login Form</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && <Text>is required</Text>}
      {errors.username?.type === 'minLength' && (
        <Text>Min length is 3 characters</Text>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 5,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text>Password (min.5 characters) is required</Text>}
      <Button title="Sign in!" onPress={handleSubmit(logIn)} />
    </View>
  );
};

export default LoginForm;
