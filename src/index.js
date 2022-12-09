{
  /* <button type="button" class="load-more">Load more</button> */
}

import { fetchImages } from './fetchImages';
// import { lazyLoading } from './lazy';
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
    })
    .catch(error => {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return error;
    });

  // lazyLoading();
  gallery.refresh();
}

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
        return `
    <div class="photo-card">
      <div class="image">
        <a class="gallery__itemssss" href="${largeImageURL}">
          <img
            class="gallery__image"
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
          />
        </a>
      </div>
      <div class="info">
        <p class="info-item"><b>Likes</b> ${likes}</p>
        <p class="info-item"><b>Views</b> ${views}</p>
        <p class="info-item"><b>Comments</b> ${comments}</p>
        <p class="info-item"><b>Downloads</b> ${downloads}</p>
      </div>
    </div>
               `;
      }
    )
    .join('');

  return markup;
}

function clear() {
  refs.galleryWrapper.innerHTML = '';
}

//! Виклик та налаштування галереї
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
  closeText: '☣',
  scrollZoom: false,
});
