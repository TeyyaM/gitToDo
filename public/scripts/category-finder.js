require('dotenv').config();

const yelp = require('yelp-fusion');

const apiKey = process.env.yelpKey;
const checkYelp = function (string) {
  const searchRequest = {
    term: string,
    location: 'vancouver' // Can change to be based on user location later
  };

  const client = yelp.client(apiKey);

  return client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    return JSON.parse(prettyJson).name;
  })
    .catch(e => {
      console.log(e);
    });
};
//Delete later
checkYelp('Jenga').then((res) => console.log(res));

module.exports = { checkYelp };

