/*
 * All routes for todos are defined here
 * Since this file is loaded in server.js into api/todos,
 *   these routes are mounted onto /todos
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { findCategory } = require("../public/scripts/category-finder");

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM todos`;
    console.log(query);
    db.query(query)
      .then(data => {
        const todos = data.rows;
        res.json({ todos });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/:user_id/:todo_id", (req, res) => {
    db.query(`SELECT *
    FROM todos
    WHERE user_id = $1 AND id = $2;`, [req.params.user_id, req.params.todo_id])
      .then(data => {
        const todo = data.rows;
        res.json({ todo });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/:user_id", (req, res) => {
    db.query(`SELECT * FROM todos
      WHERE user_id = $1;`, [req.params.user_id])
      .then(data => {
        const user_todos = data.rows;
        res.json({ user_todos });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/new", (req, res) => {

    const user_id = req.session.user_id;
    const todoInput = req.body.todo;
    // Parameters not required for a todo to be INSERTED
    const optionalInput = {
      note: req.body.note,
      deadline: req.body.deadline
    }
    if (!todoInput) {
      // Important! Add error message later
      console.log('Empty Todo!');
    } else {
      // Important! Modularize later
      let queryStart = 'INSERT INTO todos (user_id, category_id, name';
      let queryMid = ') VALUES ($1, $2, $3';
      let queryEnd = ') RETURNING id, user_id';
      findCategory(todoInput).then(returnObj => {
        // get category and specific name from APIS
        const queryArr = [user_id, returnObj.category, returnObj.name];
        for (key in optionalInput) {
          if (optionalInput[key]) {
            queryArr.push(optionalInput[key]);
            queryStart += `, ${key}`
            queryMid += `, $${queryArr.length}`;
          }
        }
        const queryString = queryStart + queryMid + queryEnd;
        db.query(queryString, queryArr)
          .then((data) => {
            // get user_id and the todo's id from data RETURNING data
            res.redirect(`/api/todos/${data.rows[0].user_id}/${data.rows[0].id}`);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      });
    }
  });

  return router;
};

