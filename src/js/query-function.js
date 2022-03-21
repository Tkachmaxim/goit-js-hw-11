const axios = require('axios').default;

export default async function getQuery(params) {
  const response = await axios.get('https://pixabay.com/api/', params);
  return response;
}
