const fs = require('fs')
const path = require('path')

const express = require("express")
const router = express.Router()

const Validator = require("../services/validators")
const DbContext = require("../services/db")
const root = require("../utils").root;
const getCollection = require("../utils").getCollection;

const dbc = new DbContext()
const v = new Validator()
dbc.useCollection("notes.json")

router.get("/", (req, res) => {
  dbc.getAll(
    records => res.render("home", { notes: records }),
    () => res.render("home", { notes: null })
  )
})

router.get("/upload_todo", (req, res) => {
  res.render("upload_todo", {})
});

router.post("/upload_todo", (req, res) => {
  if (v.isValid(req.body)) {
    dbc.saveOne(req.body, () => res.render("upload_todo", { success: true }))
  } else {
    res.render("upload_todo", { error: true, success: false })
  }
})

module.exports = router;

