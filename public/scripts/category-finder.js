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

async function findCategory(input) {
  const categories = {

    eat: {
      num: 2
      // result: the string,
      // similarity: the number
    },
    read: { num: 3 },
    watch: { num: 4 },
    buy: { num: 5 }
  }
  const string = input.toLowerCase();

  categories.eat.result = await checkYelp(string);
  categories.read.result = await checkBooks(string);
  categories.eat.similarity = stringSimilarity.compareTwoStrings(string, categories.eat.result.toLowerCase());
  categories.read.similarity = stringSimilarity.compareTwoStrings(string, categories.read.result.toLowerCase());
  console.log(categories);
};

//Delete later, test code
// checkYelp('Jenga').then((res) => console.log(res));
// checkBooks('The Things They Carried').then((res) => console.log(res));
// checkBooks('Starbucks').then((res) => console.log(res));
findCategory('starbucks')
// findCategory('starbucks').then((res) => console.log(res));

module.exports = { checkYelp, checkBooks };
