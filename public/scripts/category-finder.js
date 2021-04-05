const {
  checkYelp,
  checkBooks,
  checkIMDB
} = require("./apis");
const stringSimilarity = require("string-similarity");

async function findCategory(input) {

  const threshold = 0.8;
  const string = input.toLowerCase();

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
      num: 4,
      apiFunc: checkIMDB
    },
  }

  const buy = {
    num: 5
    // apiFunc: add in future when launched, no paid apis for proof of concepts
  }

  // will call apis and check similarities in order, if there is a perfect match, it returns
  for (const key in categories) {
    const keyObj = categories[key]
    keyObj.name = await keyObj.apiFunc(string);
    keyObj.similarity = stringSimilarity.compareTwoStrings(string, keyObj.name.toLowerCase());
    if (keyObj.similarity === 1) {
      return { category: keyObj.num, name: keyObj.name };
    }
  }

  // if there is no perfect match, it returns the closest if greater than threshold
  for (const key in categories) {
    const keyObj = categories[key]
    if (keyObj.similarity > threshold) {
      return { category: keyObj.num, name: keyObj.name };
    }
  }

  // otherwise default to misc category (currently buy instead, due to apis not being free)
  return { category: buy.num, name: string };
};

//Delete later, test code

// findCategory('starbucks').then((res) => console.log(res));
// findCategory('The Lord of the Rings').then((res) => console.log(res));
// findCategory('The Lord of the Ringssssss').then((res) => console.log(res));
// findCategory('The Things They Carried').then((res) => console.log(res));

module.exports = { findCategory };
