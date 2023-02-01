import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {Input, Button, Card} from '@rneui/themed';
import {Alert, Keyboard, ScrollView, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useCallback, useContext, useState} from 'react';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';
import {appId} from '../utils/variables';

const Upload = ({navigation}) => {
  const [mediaFile, setMediaFile] = useState({});
  const {postMedia} = useMedia();
  const [loading, setLoading] = useState(false);
  const {update, setUpdate} = useContext(MainContext);
  const {postTag} = useTag();
  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onBlur',
  });
  const upload = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const fileName = mediaFile.uri.split('/').pop();
    let fileExt = fileName.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = mediaFile.type + '/' + fileExt;
    formData.append('file', {
      uri: mediaFile.uri,
      name: fileName,
      type: mimeType,
    });
    console.log('form data', formData);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postMedia(formData, token);
      const appTag = {file_id: result.file_id, tag: appId};
      const tagResult = await postTag(appTag, token);
      console.log('Tag result', tagResult);
      Alert.alert('Upload successfully', 'File id: ' + result.file_id, [
        {
          text: 'OK',
          onPress: () => {
            setUpdate(!update);
            console.log('ok clicked');
            navigation.navigate('Home');
            reset();
          },
        },
      ]);
    } catch (error) {
      console.error('file upload failed', error);
    } finally {
      setLoading(false);
    }
  };

  const pickFile = async () => {
    // No permissions request is necessary for launching the image library
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      console.log(result);

      if (!result.canceled) {
        setMediaFile(result.assets[0]);
        trigger();
      }
    } catch (error) {
      console.log('media upload', upload);
    }
  };

  const resetForm = () => {
    setMediaFile({});
    reset();
  };
  useFocusEffect(
    useCallback(() => {
      return () => {
        resetForm();
      };
    }, [])
  );

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <Card>
          {mediaFile.type === 'video' ? (
            <Card.Title>Video</Card.Title>
          ) : (
            <Card.Image
              source={{uri: mediaFile.uri || 'http://placekitten.com/200/300'}}
              style={{height: 300}}
              onPress={pickFile}
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

          <Button title="Pick an image" onPress={pickFile} />
          <Button
            disabled={!mediaFile.uri || errors.title || errors.description}
            title="Upload"
            onPress={handleSubmit(upload)}
            loading={loading}
            loadingProps={{size: 'small', color: 'white'}}
          />
          <Button title={'Reset'} onPress={resetForm} type="outline" />
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
