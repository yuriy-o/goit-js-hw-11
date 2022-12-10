import { fetchImages } from './js/fetchImages';
import { createGallery } from './js/createGallery';
// import { lazyLoading } from './js/lazy';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const refs = {
  form: document.querySelector('#search-form'),
  galleryWrapper: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

let formValue = '';

refs.form.addEventListener('input', onFormData);
refs.form.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onFormData(e) {
  formValue = e.target.value.trim();

  // console.log(formValue);
}

function onFormSubmit(e) {
  e.preventDefault();

  // console.log('Значення, введене в Input', formValue);

  fetchImages(formValue)
    .then(data => {
      if (formValue === '') {
        return;
      }

      Notify.info(`Hooray! We found ${data.totalHits} images.`);

      return data.hits;
    })
    .then(images => {
      console.log('images', images);

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

function onLoadMore() {
  //
}

function clear() {
  refs.galleryWrapper.innerHTML = '';
}

//! Виклик та налаштування галереї
const gallery = new SimpleLightbox('.gallery a', {
  // captionsData: 'alt', //? Цей мета тег Alt краще не відображати на фото
  captionDelay: 250,
  overlayOpacity: 0.8,
  closeText: '☣',
  scrollZoom: false,
});
