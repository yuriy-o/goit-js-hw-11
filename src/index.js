{
  /* <button type="button" class="load-more">Load more</button> */
}

import { fetchImages } from './fetchImages';
import { lazyLoading } from './lazy';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs = {
  form: document.querySelector('#search-form'),
  divForGallery: document.querySelector('.gallery'),
};

let valueForm = '';

refs.form.addEventListener('input', onFormData);
refs.form.addEventListener('submit', onFormSubmit);

function onFormData(e) {
  valueForm = e.target.value;

  // console.log(valueForm);
}

function onFormSubmit(e) {
  e.preventDefault();

  lazyLoading();

  // console.log('Значення, введене в Input', valueForm);

  fetchImages(valueForm)
    .then(data => {
      return data.hits;
    })
    .then(images => {
      if (valueForm === '') {
        clear();
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      // console.log("Масив 40 об'єктів", images);

      const galleryMarkup = createGallery(images);
      // console.log(galleryMarkup);

      refs.divForGallery.insertAdjacentHTML('beforeend', galleryMarkup);
    })
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return error;
    });
}

// loading="lazy"
// src="https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"
function createGallery(galleryItems) {
  const markup = galleryItems
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <div class="image">
    <img 
      src="${webformatURL}" 
      
      alt="${tags}" 
      loading="lazy"
       /> 
  </div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  return markup;
}

//! Виклик та налаштування галереї
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
  closeText: '☣',
  scrollZoom: false,
});

function clear() {
  refs.divForGallery.innerHTML = '';
}
