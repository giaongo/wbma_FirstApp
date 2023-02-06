import {useState, useEffect, useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {appId, baseUrl} from '../utils/variables';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    const message = json.error ? `${json.message}:${json.error}` : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {update} = useContext(MainContext);
  const loadMedia = async () => {
    try {
      // const response = await fetch(baseUrl + 'media');
      // const json = await response.json();
      const json = await useTag().getFilesByTag(appId);
      json.reverse();
      const media = await Promise.all(
        json.map(async (file) => {
          const response = await fetch(baseUrl + 'media/' + file.file_id);
          return await response.json();
        })
      );
      setMediaArray(media);
    } catch (e) {
      console.error('error', e);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [update]);

  const postMedia = async (fileData, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: fileData,
    };
    try {
      return await doFetch(baseUrl + 'media', options);
    } catch (error) {
      throw new Error('postUpload ' + error.message);
    }
  };

  return {mediaArray, postMedia};
};

const useAuthentication = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      const loginResult = await doFetch(baseUrl + 'login', options);
      return loginResult;
    } catch (error) {
      throw new Error('postLogin ' + error.message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const userResult = await doFetch(baseUrl + 'users/user', options);
      return userResult;
    } catch (error) {
      throw new Error('getUser ', error.message);
    }
  };

  const postUser = async (userData) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      return await doFetch(baseUrl + 'users', options);
    } catch (error) {
      throw new Error('postUser ' + error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const result = await doFetch(baseUrl + 'users/username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('checkUsername ', error.message);
    }
  };

  const modifyUserdata = async (userData, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(userData),
    };
    try {
      return await doFetch(baseUrl + 'users', options);
    } catch (error) {
      throw new Error('updateUser ', error.message);
    }
  };
  const getUserById = async (id, token) => {
    const options = {
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const userResult = await doFetch(baseUrl + 'users/' + id, options);
      return userResult;
    } catch (error) {
      throw new Error('getUserById ', error.message);
    }
  };

  return {getUserByToken, postUser, checkUsername, modifyUserdata, getUserById};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + 'tags/' + tag);
    } catch (error) {
      throw new Error('getFilesByTag', error.message);
    }
  };
  const postTag = async (data, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'tags', options);
    } catch (error) {
      throw new Error('postTag ' + error.message);
    }
  };
  return {getFilesByTag, postTag};
};

const useFavourite = () => {
  const postFavourite = async (fileId, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({file_id: fileId}),
    };
    try {
      return await doFetch(baseUrl + 'favourites', options);
    } catch (error) {
      throw new Error('postFavourite ' + error.message);
    }
  };

  const getFavouritesByUser = async (token) => {
    const options = {
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites', options);
    } catch (error) {
      throw new Error('getFavourites ' + error.message);
    }
  };
  const getFavouritesByFileId = async (fileId, token) => {
    const options = {
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId, options);
    } catch (error) {
      throw new Error('getFavouritesByFileId ' + error.message);
    }
  };

  const deleteFavourite = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'favourites/file/' + fileId, options);
    } catch (error) {
      throw new Error('deleteFavourite ' + error.message);
    }
  };

  return {
    postFavourite,
    getFavouritesByUser,
    getFavouritesByFileId,
    deleteFavourite,
  };
};
export {useMedia, useAuthentication, useUser, useTag, useFavourite};
