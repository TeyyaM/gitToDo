const fetch = require('node-fetch');

const checkBooks = (string) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${string}`)
    .then(res => res.json())
    .then(json => json.items[0].volumeInfo.title)
    .catch(err => console.error(err));
};

/* Test Code, first is a book, second isn't */
// checkBooks('The Things They Carried').then((res) => console.log(res));
// checkBooks('Starbucks').then((res) => console.log(res));

module.exports = { checkBooks };
