import {Card, Input, Button} from '@rneui/themed';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
import {useUser} from '../hooks/ApiHooks';
const ProfileForm = ({user}) => {
  const {checkUsername} = useUser();
  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: user.username,
      password: '',
      confirmPassword: '',
      email: user.email,
    },
    mode: 'onBlur',
  });

  const updateUser = (updateData) => {
    console.log('Update data button pressed', updateData);
  };

  const checkUser = async (username) => {
    try {
      if (username !== user.username) {
        const userAvailable = await checkUsername(username);
        console.log('check user', userAvailable);
        return userAvailable || 'Username is already taken';
      } else {
        return true;
      }
    } catch (error) {
      console.error('checkUser', error.message);
    }
  };
  return (
    <Card>
      <Card.Title>Modify Profile Form</Card.Title>
      <Controller
        control={control}
        rules={{
          minLength: {
            value: 3,
            message: 'Username min length is 3 characters',
          },
          validate: checkUser,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalise="none"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          pattern: {
            value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message:
              'min 5 characters, needs one number and one uppercase letter',
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
          validate: (value) => {
            if (value === getValues('password')) {
              return true;
            } else {
              return 'passwords must match';
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
        )}
        name="confirmPassword"
      />
      <Controller
        control={control}
        rules={{
          pattern: {
            value: /^[a-z0-9.-]{1,64}@[a-z0-9.-]{3,64}/i,
            message: 'Must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Button title="Update" onPress={handleSubmit(updateUser)} />
    </Card>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
};
export default ProfileForm;
