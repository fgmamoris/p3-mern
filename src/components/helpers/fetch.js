const baseUrl = process.env.REACT_APP_URI;

const fetchSinToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/...

  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};
const fetchConToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/...
  const token = localStorage.getItem('token') || ''; // por si retorna un null
  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-access-token': token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    });
  }
};
const fetchImageConToken = (endpoint, file, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/...
  const token = localStorage.getItem('token') || ''; // por si retorna un null
  console.log(url);
  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-access-token': token,
      },
    });
  } else {
    const formData = new FormData();
    formData.append('image', file);
    console.log('ERROR??');
    return fetch(url, {
      method,
      headers: {
        'x-access-token': token,
        //'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  }
};
export { fetchSinToken, fetchConToken, fetchImageConToken };
