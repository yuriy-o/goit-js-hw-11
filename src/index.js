{
  /* <button type="button" class="load-more">Load more</button> */
}

import { fetchImages } from './js/fetchImages';
import { createGallery } from './js/createGallery';
// import { lazyLoading } from './js/lazy';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('#search-form'),
  galleryWrapper: document.querySelector('.gallery'),
};

let formValue = '';

refs.form.addEventListener('input', onFormData);
refs.form.addEventListener('submit', onFormSubmit);

function onFormData(e) {
  formValue = e.target.value.trim();

  // console.log(formValue);
}

function onFormSubmit(e) {
  e.preventDefault();

  // console.log('Значення, введене в Input', formValue);

  fetchImages(formValue)
    .then(data => {
      return data.hits;
    })
    .then(images => {
      if (formValue === '' || images.length === 0) {
        clear();
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      // console.log("Масив 40 об'єктів", images);

      const galleryMarkup = createGallery(images);
      // console.log(galleryMarkup);

      refs.galleryWrapper.insertAdjacentHTML('beforeend', galleryMarkup);

      gallery.refresh();
    })
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return error;
    });

  // lazyLoading();
  e.target.reset();
}

function clear() {
  refs.galleryWrapper.innerHTML = '';
}

//! Виклик та налаштування галереї
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
// const gallery = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   overlayOpacity: 0.8,
//   closeText: '☣',
//   scrollZoom: false,
// });
