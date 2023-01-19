import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, Text, TextInput, Button} from 'react-native';
import {useUser} from '../hooks/ApiHooks';

const RegisterForm = () => {
  const {postUser} = useUser();
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

  return (
    <View>
      <Text>Registration Form</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Username"
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
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text>Password (min.5 characters) is required</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
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
          <TextInput
            placeholder="Fullname"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
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
