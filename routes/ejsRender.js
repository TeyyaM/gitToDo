const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  // Home page
  router.get("/", (req, res) => {
    const templateVars = {
      user_id: req.session.user_id,
      index: true,
    };
    res.render("index", templateVars);
  });
  router.get("/todos/categories", (req, res) => {
    const templateVars = {
      user_id: req.session.user_id,
      index: true,
    };
    res.render("todo_categories", templateVars);
  });

  // category 1, 2, 3 etc...
  router.get("/todos/categories/:category_id", (req, res) => {
    const category_id = req.params.category_id;
    const queryParams = [req.session.user_id];
    let query = `SELECT *
    FROM todos
    WHERE user_id = $1`;
    if (category_id !== "all") {
      query += ` AND category_id = $2`;
      queryParams.push(category_id);
    }
    pool.query(query, queryParams).then((data) => {
      const templateVars = {
        user_id: req.session.user_id,
        index: false,
        todos: data.rows,
      };
      res.render("todo_list", templateVars);
    });
  });

  router.get("/todos/:todo_id", (req, res) => {
    const query = `SELECT *
    FROM todos
    WHERE user_id = $1 AND id = $2;`;
    const queryParams = [req.session.user_id, req.params.todo_id];
    pool.query(query, queryParams).then((data) => {
      const templateVars = {
        user_id: req.session.user_id,
        index: false,
        todos: data.rows[0],
      };
      res.render("todo_show", templateVars);
    });
  });

  router.post("todos/:todo_id/edit", (req, res) => {});

  return router;
};
