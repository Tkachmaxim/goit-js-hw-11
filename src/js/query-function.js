const axios = require('axios').default;

export default async function getQuery(params) {
  const response = await axios.get('https://pixabay.com/api/', params);
  return response;
}

/* export default async function getPictures(imageRequest) {
  const URL = `${parameters.ENDPOINT}?key=${parameters.APIKEY}&q=${imageRequest}&image_type=photo&orientation=horizontal&safesearch=true&per_page=39&page=${parameters.page}`;
  try {
    const response = await axios.get(URL);
    if (response.data.hits) {
      console.log(response.data.hits.length);
      const result = response.data.hits;
      refs.buttonLoadMore.classList.remove('is-hidden');
      Notiflix.Notify.success(`Hooray, we found ${response.data.totalHits} images!`);
      createMarkUp(result);
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please, try again',
      );
      clearMarkUp();
      refs.buttonLoadMore.classList.add('is-hidden');
    }
  } catch (error) {}
} */
