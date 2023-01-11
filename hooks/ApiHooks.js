import {useState, useEffect} from 'react';
import {baseUrl} from '../utils/variables';

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
export {useMedia};
