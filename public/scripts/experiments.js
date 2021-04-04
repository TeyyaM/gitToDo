//  const request = require('request');

/*
const findCategory = function (string)  {
  check APIs in order
   call Restraunts API function(string)
     if (api pings) return restraunt category number4
   call Read API function
      if (api pings) return Read category number
   call Watch API function
      if (api pings) return Watch category number
   call Buy API function
      if (api pings) return Buy category number
   return (misc category number)
 }
 */


// const fetchMyAPI = function(input) {
//   request('https://api.yelp.com/v3/businesses/${input}', (error, response, body) => {
//     if (error) return callback(error, null);

//     if (response.statusCode !== 200) {
//       callback(Error(`Status Code ${response.statusCode} when fetching API: ${body}`), null);
//       return;
//     }

//     const ip = JSON.parse(body).ip;
//     callback(null, ip);
//   });
// };


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
    console.log('log is ' + JSON.parse(prettyJson).name);
    return JSON.parse(prettyJson).name;
  })
    .then((finalJson) => {
      console.log('log 2 is ' + finalJson)
      return finalJson;
    })
    .catch(e => {
      console.log(e);
    });

}

checkYelp('Jenga').then((res) => console.log("Hello there", res));

module.exports = { checkYelp };
