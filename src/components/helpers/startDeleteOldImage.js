import { fetchConToken } from './fetch';

export const startDeleteOldImage = (path) => {
  return async () => {
    let name = path;
    name = name.replace(/^.*[\\\/]/, '');
    name = name.split('.');
    const id = name[0];
    try {
      const resp = await fetchConToken(`image/${id}`, {}, 'DELETE');
      if (resp.ok) {
        return true;
      } else {
        throw await resp.json();
      }
    } catch (err) {
      throw err;
    }
  };
};
