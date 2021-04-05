// Uncomment the dotenv when testing via node/public/scripts/category-function
// Not needed when called in browser (called in server.js)
require('dotenv').config();

const yelp = require('yelp-fusion');
const fetch = require('node-fetch');
const imdb = require('imdb-api');

const omdbKey = process.env.omdb_key;
const yelpKey = process.env.yelpKey;

const checkYelp = (string) => {
  const searchRequest = {
    term: string,
    location: 'vancouver' // Can change to be based on user location later
  };

  const client = yelp.client(yelpKey);

  return client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    return JSON.parse(prettyJson).name;
  })
    .catch(() => {
      return 'yelp api error';
    });
};

const checkBooks = (string) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${string}`)
    .then(res => res.json())
    .then(json => json.items[0].volumeInfo.title)
    .catch(() => {
      return 'book api error';
    });
};

const checkIMDB = (string) => {
  const cli = new imdb.Client({ apiKey: omdbKey });

  return cli.get({ 'name': string }).then(response => {
    // console.log(response.title);
    return response.title;
  })
    .catch(e => {
      return (e.name);
      // return 'Movie not found!'
    });

}

module.exports = {
  checkYelp,
  checkBooks,
  checkIMDB
};
