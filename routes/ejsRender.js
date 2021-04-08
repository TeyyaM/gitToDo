const express = require("express");
const router = express.Router();
const { newTodoQuery } = require("../public/scripts/helpers");
const generateTodoHelpers = require("../db/helpers/todohelpers");

module.exports = (pool) => {
  const {
    fetchTodoByCategory,
    fetchTodoByTodoId } = generateTodoHelpers(pool);
  // Home page
  router.get("/", (req, res) => {
    const user_id = req.session.user_id;
    pool.query(`SELECT name FROM users
    WHERE id = $1`, [user_id])
      .then((data) => {
        const templateVars = {
          user_id,
          username: data.rows[0].name,
          index: true,
        };
        res.render("index", templateVars);
      })
  });

  router.get("/todos/categories", (req, res) => {
    const templateVars = {
      user_id: req.session.user_id,
      index: false
    };
    res.render("todo_categories", templateVars);
  });

  // category 1, 2, 3 etc...
  router.get("/todos/categories/:category_id", (req, res) => {
    const category_id = req.params.category_id;
    fetchTodoByCategory(category_id, req.session.user_id).then((data) => {
      const templateVars = {
        user_id: req.session.user_id,
        index: false,
        todos: data.rows,
      };
      console.log("TODOS", data.rows);
      res.render("todo_list", templateVars);
    });
  });

  router.get("/todos/:todo_id", (req, res) => {
    fetchTodoByTodoId(req.params.todo_id, req.session.user_id)
      .then((data) => {
        const templateVars = {
          user_id: req.session.user_id,
          todo_id: req.params.todo_id,
          index: false,
          todo: data.rows[0]
        };
        res.render("todo_show", templateVars);
      });
  });

  // edit to do item
  router.post("/todos/:todo_id/:column_name", (req, res) => {
    // console.log(req);
    // // Complete or Delete a todo
    const queryParams = [req.session.user_id, req.params.todo_id];
    const column_name = req.params.column_name;
    let queryString = '';
    if (column_name === 'delete') {
      queryString = `DELETE
      FROM todos`;
    } else if (column_name === 'complete') {
      queryString = `UPDATE todos
      SET date_completed = NOW()`;
    } else {
      // could work for category_id, note, name, or deadline with front-end funtionality
      const attribute = req.body.dbIndex
      queryString = `UPDATE todos
      SET ${column_name} = ${attribute}`;
    }

    queryString += ` WHERE user_id = $1 AND id = $2`;
    pool.query(queryString, queryParams)
      .then(() => {
        res.redirect("/todos/categories");
      })
      .catch(err => {
        res.status(500)
          .json({ error: err.message });
      });

  });

  router.post("/todos/new", (req, res) => {
    const inputObj = {
      user_id: req.session.user_id,
      todoInput: req.body.todo,
      // Parameters not required for a todo to be INSERTED
      optional: {
        note: req.body.note,
        deadline: req.body.deadline,
      },
    };
    if (!inputObj.todoInput) {
      // Important! Add error message later
      console.log("Empty Todo!");
    } else {
      newTodoQuery(inputObj).then((returnObj) => {
        pool
          .query(returnObj.str, returnObj.arr)
          .then((data) => {
            // get user_id and the todo's id from data RETURNING data
            res.redirect(
              `/todos/${data.rows[0].id}`
            );
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      });
    }
  });

  return router;
};
