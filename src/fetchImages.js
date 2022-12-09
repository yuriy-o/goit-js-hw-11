export function fetchImages(searchQuery) {
  return fetch(
    `https://pixabay.com/api/?key=17067261-d096522309c4f7c33a0f4f98e&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }

    return resp.json();
  });
}
