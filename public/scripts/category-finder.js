require('dotenv').config();

const yelp = require('yelp-fusion');
const fetch = require('node-fetch');
const stringSimilarity = require("string-similarity");
// const compareString = stringSimilarity.compareTwoStrings;

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

const findCategory = (input) => {
  const eat = 2;
  const read = 3;
  const watch = 4;
  const buy = 5;
  const string = input.toLowerCase();
  const results = {};
  return checkYelp(string)
    .then((res) => {
      results.eat = stringSimilarity.compareTwoStrings(string, res.toLowerCase())
      console.log(results.eat)
    })
    .catch(err => console.error(err, 'with Yelp'))
    .then(() => {
      if (results.eat = 1) {
        return eat;
      }
    })
    .then(() => {
      checkBooks(string)
    })
    .then((res) => {
      console.log(res);
      results.read = stringSimilarity.compareTwoStrings(string, res.toLowerCase());
    })
    .then(() => {
      if (results.read = 1) {
        return read;
      }
    })
    .then(() => console.log(results));
};
//Delete later, test code
// checkYelp('Jenga').then((res) => console.log(res));
// checkBooks('The Things They Carried').then((res) => console.log(res));
// checkBooks('Starbucks').then((res) => console.log(res));
findCategory('starbucks').then((res) => console.log(res));

module.exports = { checkYelp, checkBooks };

