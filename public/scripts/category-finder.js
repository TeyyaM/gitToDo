const {
  checkYelp,
  checkBooks,
  checkIMDB
} = require("./apis");
const stringSimilarity = require("string-similarity");

async function findCategory(input) {
  const categories = {
    eat: {
      num: 2,
      apiFunc: checkYelp
    },
    read: {
      num: 3,
      apiFunc: checkBooks
    },
    watch: {
      num: 4
      // apiFunc: checkIMDB
    },
    buy: {
      num: 5
      // apiFunc: function
    }
  }
  const string = input.toLowerCase();
  for (const key in categories) {
    // need all the keys to have functions before we can loop, then can remove the if statement
    if (categories[key].apiFunc) {
      categories[key].name = await categories[key].apiFunc(string);
      categories[key].similarity = stringSimilarity.compareTwoStrings(string, categories[key].name.toLowerCase());
    }
  }
  // final version will return the name of the object (to be inserted into the todo) and category_id
  // final version will check similarities in order, if there is a perfect match, it returns
  // if there is no perfect match, it returns the closest
  // final version will also have minimun value for similarity otherwise default to misc category

  return (categories);
};

//Delete later, test code

// findCategory('starbucks').then((res) => console.log(res));
// findCategory('The Things They Carried').then((res) => console.log(res));

module.exports = { findCategory };
