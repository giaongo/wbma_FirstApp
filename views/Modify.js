import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {Input, Button, Card} from '@rneui/themed';
import {Alert, Keyboard, ScrollView, TouchableOpacity} from 'react-native';
import {useContext, useRef, useState} from 'react';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils/variables';
import {Video} from 'expo-av';
const Modify = ({navigation, route}) => {
  const [mediaFile] = useState({});
  const {file} = route.params;
  const {putMedia} = useMedia();
  const [loading, setLoading] = useState(false);
  const {update, setUpdate} = useContext(MainContext);
  const video = useRef(null);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      title: file.title,
      description: file.description,
    },
    mode: 'onBlur',
  });

  const modifyFile = async (data) => {
    setLoading(true);

    console.log('data', data);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await putMedia(file.file_id, data, token);

      Alert.alert('Modify successfully', result.message, [
        {
          text: 'OK',
          onPress: () => {
            setUpdate(!update);
            console.log('ok clicked');
            navigation.navigate('MyFiles');
            reset();
          },
        },
      ]);
    } catch (error) {
      console.error('file Modify failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <Card>
          {file.media_type === 'video' ? (
            <Video
              ref={video}
              source={{uri: uploadsUrl + file.filename}}
              style={{width: '100%', height: '60%'}}
              useNativeControls
              resizeMode="contain"
              isLooping
              onError={(error) => {
                console.log(error);
              }}
            />
          ) : (
            <Card.Image
              source={{uri: mediaFile.uri || 'http://placekitten.com/200/300'}}
              style={{height: 300}}
            />
          )}

          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'is required'},
              minLength: {
                value: 3,
                message: 'Title min length is 3 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title && errors.title.message}
              />
            )}
            name="title"
          />
          <Controller
            control={control}
            rules={{
              minLength: {
                value: 5,
                message: 'Title min length is 5 characters',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.description && errors.description.message}
              />
            )}
            name="description"
          />

          <Button
            title="Modify"
            onPress={handleSubmit(modifyFile)}
            loading={loading}
            loadingProps={{size: 'small', color: 'white'}}
          />
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

Modify.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Modify;
