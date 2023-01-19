import {useState, useEffect} from 'react';
import {baseUrl} from '../utils/variables';

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

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();
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
  }, []);

  return {mediaArray};
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
  return {getUserByToken, postUser};
};

export {useMedia, useAuthentication, useUser};
