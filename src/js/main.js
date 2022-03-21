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

  removeClassIsHidden() {
    this.buttonLoadMore.classList.remove('is-hidden');
  },

  addClassIsHidden() {
    this.buttonLoadMore.classList.add('is-hidden');
  },
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

  increasePage() {
    this.params.page += 1;
  },

  resetToDefaultPageIsFilled() {
    this.params.page = 1;
    this.isFilled = false;
  },

  setQuery(request) {
    this.params.q = request;
  },
};

refs.formInput.addEventListener('submit', onFormSearch);
refs.buttonLoadMore.addEventListener('click', onLoadButton);

function onFormSearch(e) {
  clearMarkUp();
  parameters.resetToDefaultPageIsFilled();
  e.preventDefault();
  const request = e.currentTarget.elements.searchQuery.value;
  parameters.setQuery(request);
  if (request) {
    try {
      return getQuery(parameters).then(handlingResult);
    } catch (error) {
      console.log(error);
    }
  } else {
    Notiflix.Notify.failure('Enter not empty query');
  }
}

function handlingResult(response) {
  firstNotification(response);
  if (response.data.hits.length) {
    const markUp = createMarkUp(response.data.hits);
    refs.pictures.insertAdjacentHTML('beforeend', markUp);
    gallerySimple.refresh();
    refs.removeClassIsHidden();
    checkIsFilled(response);
  } else {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    clearMarkUp();
    refs.buttonLoadMore.classList.add('is-hidden');
  }
}

function checkIsFilled(response) {
  if (response.data.hits.length < parameters.params.per_page) {
    parameters.isFilled = true;
  }
}

function firstNotification(response) {
  if (response.data.hits.length && parameters.params.page === 1) {
    Notiflix.Notify.success(`Hooray, we found ${response.data.totalHits} images!`);
  }
}

function clearMarkUp() {
  refs.addClassIsHidden();
  refs.pictures.innerHTML = '';
  parameters.isFilled = false;
}

function onLoadButton() {
  if (parameters.isFilled) {
    return endOfQueryNotification();
  }
  refs.buttonLoadMore.classList.remove('is-hidden');
  parameters.increasePage();
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
