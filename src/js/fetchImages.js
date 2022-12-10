import axios from 'axios';

export default class NewsApiService {
  constructor() {}

  fetchImages(searchQuery) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '17067261-d096522309c4f7c33a0f4f98e';

    return axios
      .get(
        `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
      )
      .then(response => {
        // if (response.status !== 200) {
        //   throw new Error(response.status);
        // }

        console.log(response);
        console.log(response.data);
        console.log(response.data.hits);

        return response.data;
      });
  }
}

//! Base API on axios
// export function fetchImages(searchQuery) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const API_KEY = '17067261-d096522309c4f7c33a0f4f98e';

//   return axios
//     .get(
//       `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
//     )
//     .then(response => {
//       // if (response.status !== 200) {
//       //   throw new Error(response.status);
//       // }

//       console.log(response);
//       console.log(response.data);
//       console.log(response.data.hits);

//       return response.data;
//     });
// }

//! Base API on fetch
// export function fetchImages(searchQuery) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const API_KEY = '17067261-d096522309c4f7c33a0f4f98e';

//   return fetch(
//     `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
//   ).then(resp => {
//     if (!resp.ok) {
//       throw new Error(resp.status);
//     }

//     return resp.json();
//   });
// }
