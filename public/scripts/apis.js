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
    .catch(e => {
      console.log(e);
    });
};



const checkBooks = (string) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${string}`)
    .then(res => res.json())
    .then(json => json.items[0].volumeInfo.title)
    .catch(err => console.error(err));
};

const checkIMDB = (string) => {
  const cli = new imdb.Client({ apiKey: omdbKey });

  // cli.get({'name': 'The Lord of the Rings: The Two Towers'}).then(console.log);

  return cli.get({ 'name': string }).then(response => {
    console.log(response.title);
    return response.title;
  })
    .catch(e => {
      console.log(e);
    });

}

// checkIMDB('The Lord of the Rings: The Two Towers').then((res) => console.log("Hello there", res));

/* Test Code, first is a book, second isn't */
// checkBooks('The Things They Carried').then((res) => console.log(res));
// checkBooks('Starbucks').then((res) => console.log(res));

module.exports = {
  checkYelp,
  checkBooks,
  checkIMDB
};
