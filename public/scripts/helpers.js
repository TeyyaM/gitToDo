const {
  checkYelp,
  checkBooks,
  checkIMDB
} = require("./apis");
const stringSimilarity = require("string-similarity");

async function findCategory(input) {
  const threshold = 0.8;
  const string = input.toString().toLowerCase();

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

const newTodoQuery = (inputObj) => {

  return findCategory(inputObj.todoInput).then(returnObj => {
    let queryStart = 'INSERT INTO todos (user_id, category_id, name';
    let queryMid = ') VALUES ($1, $2, $3';
    let queryEnd = ') RETURNING id, user_id';
    // get category and specific name from APIS
    const queryArr = [inputObj.user_id, returnObj.category, returnObj.name];
    for (const key in inputObj.optional) {
      if (inputObj.optional[key]) {
        queryArr.push(inputObj.optional[key]);
        queryStart += `, ${key}`
        queryMid += `, $${queryArr.length}`;
      }
    }
    const queryObj = {
      str: queryStart + queryMid + queryEnd,
      arr: queryArr
    };
    // return for db.query(queryString, queryArr)
    return queryObj;
  })

};

module.exports = { newTodoQuery }

