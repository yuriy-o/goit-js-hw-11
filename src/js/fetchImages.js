//? Як винести логіку роботи API в окремий файл https://youtu.be/poxVZxvONF8?t=1770
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '17067261-d096522309c4f7c33a0f4f98e';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchImages() {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
    );
    console.log('response', response);

    const data = response.data;
    console.log('response.data', response.data);

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    this.incrementPage();

    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

//! Клас без async/await
// export default class NewsApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   fetchImages() {
//     return axios
//       .get(
//         `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
//       )
//       .then(response => {
//         if (response.status !== 200) {
//           throw new Error(response.status);
//         }

//         this.incrementPage();

//         return response.data;
//       });
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }

//! Base API on axios
// export function fetchImages(searchQuery) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const API_KEY = '17067261-d096522309c4f7c33a0f4f98e';

//   return axios
//     .get(
//       `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
//     )
//     .then(response => {
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
