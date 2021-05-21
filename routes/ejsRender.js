const express = require("express");
const router = express.Router();
const { newTodoQuery } = require("../public/scripts/helpers");
const generateTodoHelpers = require("../db/helpers/todohelpers");

module.exports = (pool) => {
  const {
    fetchTodoByCategory,
    fetchTodoByTodoId,
    updateTodoTable } = generateTodoHelpers(pool);

  // Home page
  router.get("/", (req, res) => {
    const user_id = req.session.user_id;
    pool.query(`SELECT name FROM users
    WHERE id = $1`, [user_id])
      .then((data) => {
        let username = '';
        if (data.rows[0]) {
          username = data.rows[0].name;
        }
        const templateVars = {
          user_id,
          username,
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
    const inputObj = {
      categoryId: req.params.category_id,
      userId: req.session.user_id
    }
    fetchTodoByCategory(inputObj).then((data) => {
      const templateVars = {
        user_id: req.session.user_id,
        index: false,
        todos: data.rows,
      };
      res.render("todo_list", templateVars);
    });
  });

  router.get("/todos/:todo_id", (req, res) => {
    const inputObj = {
      todoId: req.params.todo_id,
      userId: req.session.user_id
    }
    fetchTodoByTodoId(inputObj)
      .then((data) => {
        const templateVars = {
          user_id: inputObj.userId,
          todo_id: inputObj.todoId,
          index: false,
          todo: data.rows[0]
        };
        res.render("todo_show", templateVars);
      });
  });

  // edit to do item
  router.post("/todos/:todo_id/:column_name", (req, res) => {
    const input = {
      userId: req.session.user_id,
      todoId: req.params.todo_id,
      columnName: req.params.column_name,
      attribute: req.body.dbIndex
    }
    updateTodoTable(input)
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
        deadline: req.body.deadline
      }
    };
    if (inputObj.todoInput) {
      newTodoQuery(inputObj).then((returnObj) => {
        pool.query(returnObj.str, returnObj.arr)
          .then((data) => {
            // get user_id and the todo's id from RETURNING data
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
