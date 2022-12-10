export function createGallery(galleryItems) {
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
      <div class="wrap">
        <a class="gallery__item" href="${largeImageURL}">
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
