// import { lazyLoading } from './js/lazy';
import { createGallery } from './js/createGallery';
import NewsApiService from './js/fetchImages';
import LoadMoreBtn from './js/components/load-more-btn';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import bootstrap from 'bootstrap';
const bootstrap = require('bootstrap');

const refs = {
  form: document.querySelector('#search-form'),
  articlesContainer: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onFormSubmit(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (newsApiService.query === '') {
    Notify.warning('The search query is empty. Please try again.');
    return;
  }

  loadMoreBtn.show();
  loadMoreBtn.disable();
  newsApiService.resetPage();
  clearArticlesContainer();

  newsApiService
    .fetchImages()
    .then(data => {
      Notify.info(`Hooray! We found ${data.totalHits} images.`);

      return data.hits;
    })
    .then(onGalleryMarkup)
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return error;
    });
}

function onLoadMore() {
  loadMoreBtn.disable();

  newsApiService
    .fetchImages()
    .then(data => {
      return data.hits;
    })
    .then(onGalleryMarkup)
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return error;
    });
}

function onGalleryMarkup(images) {
  const galleryMarkup = createGallery(images);

  refs.articlesContainer.insertAdjacentHTML('beforeend', galleryMarkup);
  loadMoreBtn.enable();
  gallery.refresh();
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

//! Виклик та налаштування галереї
const gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  overlayOpacity: 0.8,
  closeText: '☣',
  scrollZoom: false,
});
