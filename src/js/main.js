import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getQuery from './query-function';
import createMarkUp from './markup';
import Notiflix, { Notify } from 'notiflix';

const gallerySimple = new SimpleLightbox('.image-link');

const refs = {
  formInput: document.querySelector('#search-form'),
  pictures: document.querySelector('.gallery'),
  buttonLoadMore: document.querySelector('.load-more'),
};

const parameters = {
  params: {
    q: '',
    page: 1,
    per_page: 39,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    key: '26204743-91e6994ab793c005630c1d93c',
  },

  isFilled: false,
};

refs.formInput.addEventListener('submit', onFormSearch);
refs.buttonLoadMore.addEventListener('click', onLoadButton);

function onFormSearch(e) {
  clearMarkUp();
  parameters.params.page = 1;
  parameters.isFilled = false;
  e.preventDefault();
  const request = e.currentTarget.elements.searchQuery.value;
  parameters.params.q = request;
  getQuery(parameters);
  if (request) {
    try {
      return getQuery(parameters).then(handlingResult);
    } catch (error) {
      console.log(error);
    }
  } else {
    Notiflix.Notify.failure('Enter not empty query');
  }
  //Notiflix.Notify.failure('Enter not same or not empty query');
}

function handlingResult(response) {
  console.log(parameters.params.page);
  firstNotification(response);
  if (response.data.hits.length) {
    const markUp = createMarkUp(response.data.hits);
    refs.pictures.insertAdjacentHTML('beforeend', markUp);
    gallerySimple.refresh();
    refs.buttonLoadMore.classList.remove('is-hidden');
    if (response.data.hits.length < parameters.params.per_page) {
      parameters.isFilled = true;
    }
  } else {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    clearMarkUp();
    refs.buttonLoadMore.classList.add('is-hidden');
  }
}

function firstNotification(response) {
  if (response.data.hits.length && parameters.params.page === 1) {
    Notiflix.Notify.success(`Hooray, we found ${response.data.totalHits} images!`);
  }
}

function clearMarkUp() {
  refs.pictures.innerHTML = '';
  parameters.isFilled = false;
}

function onLoadButton() {
  if (parameters.isFilled) {
    return endOfQueryNotification();
  }
  refs.buttonLoadMore.classList.remove('is-hidden');
  parameters.params.page += 1;
  getQuery(parameters)
    .then(handlingResult)
    .then(scrollWindow)
    .catch(error => endOfQueryNotification());
}

function endOfQueryNotification() {
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  return refs.buttonLoadMore.classList.add('is-hidden');
}

function scrollWindow() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

/* function isFilled() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results");
  loadMoreButton();
} */

/* import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import getPictures from './js/query-function';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formInput: document.querySelector('#search-form'),
  pictures: document.querySelector('.gallery'),
  buttonLoadMore: document.querySelector('.load-more'),
}; */

/* const parameters = {
  APIKEY: '26204743-91e6994ab793c005630c1d93c',
  ENDPOINT: 'https://pixabay.com/api/',
  page: 1,
  request: '',
  isFilled: false,
}; */

/* refs.formInput.addEventListener('submit', onFormSearch); */
/* refs.buttonLoadMore.addEventListener('click', onLoadButton); */

/* const gallerySimple = new SimpleLightbox('.image-link', {
  captionDelay: 250,
});

const picturesSearchServiceObject = new getPictures();

function onFormSearch(e) {
  clearMarkUp();
  e.preventDefault();
  const request = e.currentTarget.elements.searchQuery.value;

  if (request) {
    picturesSearchServiceObject.options.q = request;
    console.log(request);
    return picturesSearchServiceObject.getQuery();
  }
  Notiflix.Notify.failure('Enter not same or not empty query');
} */

/* function createMarkUp(markUpObject) {
  const markUp = markUpObject
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
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
  refs.pictures.insertAdjacentHTML('beforeend', markUp);
  gallerySimple.refresh();
  if (parameters.page === 1) {
    return;
  }
  scrollWindow();
  if (!markUpObject.length) {
    isFilled();
  }
}

function clearMarkUp() {
  refs.pictures.innerHTML = '';
  parameters.isFilled = false;
}

function onLoadButton() {
  if (parameters.isFilled) {
    return isFilled();
  }
  parameters.page += 1;
  getPictures(parameters.request);
}

function scrollWindow() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function isFilled() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results");
  refs.buttonLoadMore.classList.add('is-hidden');
  parameters.isFilled = false;
}
 */
