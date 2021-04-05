require('dotenv').config();
const omdbKey = process.env.omdb_key;
const imdb = require('imdb-api');



const checkIMDB = (string) => {
  const cli = new imdb.Client({apiKey: omdbKey});

  // cli.get({'name': 'The Lord of the Rings: The Two Towers'}).then(console.log);

  return cli.get({'name': string}).then(response => {
      console.log(response.title);
      return response.title;
  })
    .catch(e => {
      console.log(e);
    });

}

// checkIMDB('The Lord of the Rings: The Two Towers').then((res) => console.log("Hello there", res));

module.exports = { checkIMDB };

