const { findCategory } = require("./category-finder");

const newTodoQuery = (inputObj) => {

  return findCategory(inputObj.todoInput).then(returnObj => {
    let queryStart = 'INSERT INTO todos (user_id, category_id, name';
    let queryMid = ') VALUES ($1, $2, $3';
    let queryEnd = ') RETURNING id, user_id';
    // get category and specific name from APIS
    const queryArr = [inputObj.user_id, returnObj.category, returnObj.name];
    for (key in inputObj.optional) {
      if (inputObj.optional[key]) {
        queryArr.push(inputObj.optional[key]);
        queryStart += `, ${key}`
        queryMid += `, $${queryArr.length}`;
      }
    }
    console.log('before return');
    const queryObj = {
      str: queryStart + queryMid + queryEnd,
      arr: queryArr
    };
    // return for db.query(queryString, queryArr)
    return queryObj;
  })

};
module.exports = { newTodoQuery }

