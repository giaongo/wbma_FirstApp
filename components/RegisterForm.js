import {Input, Button} from '@rneui/themed';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, Text} from 'react-native';
import {useUser} from '../hooks/ApiHooks';

const RegisterForm = () => {
  const {postUser, checkUsername} = useUser();
  // const {setIsLoggedIn} = useContext(MainContext);
  // const {postLogin} = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const register = async (registerData) => {
    console.log('Register Button pressed', registerData);
    try {
      const registerResult = await postUser(registerData);
      console.log('Registration result', registerResult);
    } catch (error) {
      console.error('Error with registering', error);
    }
  };

  const checkUser = async (username) => {
    try {
      const userAvailable = await checkUsername(username);
      console.log('check user', userAvailable);
      return userAvailable || 'Username is already taken';
    } catch (error) {
      console.error('checkUser', error.message);
    }
  };

  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 22,
          fontWeight: 'bold',
          marginTop: 16,
        }}
      >
        Registration Form
      </Text>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          minLength: {value: 3, message: 'Username min length is 3 characters'},
          validate: checkUser,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message:
              'min.5 characters, needs one number and one uppercase letter',
          },
          pattern: {
            value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message:
              'min.5 characters, needs one number and one uppercase letter',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
        name="email"
      />
      {errors.email?.type === 'required' && <Text>is required</Text>}

      <Controller
        control={control}
        rules={{
          minLength: 3,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Fullname"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
          />
        )}
        name="full_name"
      />
      {errors.full_name?.type === 'minLength' && (
        <Text>min length is 3 characters</Text>
      )}
      <Button title="Register" onPress={handleSubmit(register)} />
    </View>
  );
};

export default RegisterForm;
