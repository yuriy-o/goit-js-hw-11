export function createGallery(galleryItems) {
  const markup = galleryItems
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags: alt,
        likes,
        views,
        comments,
        downloads,
        pageURL,
      }) => {
        //! Наступний код із URL робить тайтл для картинки
        //? Чому не виходь винести цей код в окрему функцію ??
        const string = pageURL
          .replace('https://pixabay.com/photos/', '')
          .slice(0, pageURL.length - 35)
          .replaceAll('-', ' ')
          .trim()
          .split(' ');

        const withoutDuplicates = [...new Set(string)].join(' ');
        const array = withoutDuplicates.split('');
        const firstLetterInUpperCase = array.shift().toUpperCase();
        const withOutFirstLetter = array.slice(0, array.length).join('');
        const title = firstLetterInUpperCase + withOutFirstLetter;
        //! End title

        return `
    <div class="photo-card">
      <div class="wrap">
        <a class="gallery__item" href="${largeImageURL}">
          <img
            class="gallery__image"
            src="${webformatURL}"
            alt="${alt}"
            title="${title}"
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
