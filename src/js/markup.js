export default function createMarkUp(markUpObject) {
  return markUpObject
    .map(({ webformatURL, largeImageURL, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
      <a href="${largeImageURL}" class="image-link"><img src="${webformatURL}" alt="image" width="640px" height="400px" loading="lazy" /></a>

  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <b class="info-data">${likes}</b>
    </p>
    <p class="info-item">
      <b>Views</b>
      <b class="info-data">${views}</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <b class="info-data">${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <b class="info-data">${downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
}
