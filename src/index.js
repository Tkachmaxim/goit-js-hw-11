import './sass/main.scss';

const refs = {
  formInput: document.querySelector('#search-form'),
  pictures: document.querySelector('.gallery'),
};

refs.formInput.addEventListener('input', onFormSearch);

function onFormSearch(e) {
  const request = e.currentTarget.elements.searchQuery.value;
  console.log(request);
}
