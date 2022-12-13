// import { lazyLoading } from './js/lazy';
import { createGallery } from './js/createGallery';
import NewsApiService from './js/fetchImages';
import LoadMoreBtn from './js/components/load-more-btn';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from 'axios';
// import bootstrap from 'bootstrap';

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
const bootstrap = require('bootstrap');

refs.form.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

async function onFormSubmit(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (newsApiService.query === '') {
    Notify.warning('The search query is empty. Please try again.');
    return;
  }

  // loadMoreBtn.show(); //! Ввімкнути, якщо треба показати кнопку зі спіннером під час першого завантаження
  loadMoreBtn.disable();

  newsApiService.resetPage();

  clearArticlesContainer();

  try {
    const data = await newsApiService.fetchImages();
    const array = data.hits; //! ?? await //??
    const markup = onGalleryMarkup(array);

    //! Перевіряє на вірність запросу. Якщо по запросу нема даних, то видає помилку
    if (Number(data.totalHits) === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.hide();
      return;
    }

    //! Перевірка 1 ==> Показуємо чи ховаємо другу кнопку <Show more>
    const numberPages = Math.ceil(data.totalHits / newsApiService.perPage);
    if (newsApiService.page <= numberPages) {
      loadMoreBtn.show();
      loadMoreBtn.enable();
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    return markup;
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return error;
  }
}

//! функція onLoadMore() з async/await
async function onLoadMore() {
  loadMoreBtn.disable();

  try {
    const data = await newsApiService.fetchImages();

    //! Перевірка 2 ==> Ховаємо чи показуємо другу кнопку <Show more>
    const numberPages = Math.ceil(data.totalHits / newsApiService.perPage);
    if (newsApiService.page > numberPages) {
      loadMoreBtn.hide();
      loadMoreBtn.disable();
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    const array = data.hits; //! ?? await //??
    const markup = onGalleryMarkup(array);
    return markup;
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return error;
  }
}

//! функція onLoadMore() без async/await
// function onLoadMore() {
//   loadMoreBtn.disable();

//   newsApiService
//     .fetchImages()
//     .then(data => {
//       return data.hits;
//     })
//     .then(onGalleryMarkup)
//     .catch(error => {
//       Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return error;
//     });
// }

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
