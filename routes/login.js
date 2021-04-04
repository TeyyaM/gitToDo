const express = require('express');
const router = express.Router();
const cookieSession = require("cookie-session");

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
    req.session.user_id = req.params.user_id;
    res.redirect(`/api/todos/${req.session.user_id}`)
  });
  return router;
};
