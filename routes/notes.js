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

router.get('/:id/delete', (req, res) => {
  dbc.deleteOne(
    req.params.id, 
    () => res.redirect('/')),
    () => res.sendStatus(500)
})

router.get("/:id/archive", (req, res) => {
  fs.readFile(getCollection('notes.json'), (err, data) => {
    if (err) res.sendStatus(500)

    const notes = JSON.parse(data)
    const note = notes.filter(note => note.id == req.params.id)[0]
    const noteIdx = notes.indexOf(note)
    const splicedNote = notes.splice(noteIdx, 1)[0]
    splicedNote.archive = true
    notes.push(splicedNote)

    fs.writeFile(getCollection('notes.json'), JSON.stringify(notes), err => {
      if (err) res.sendStatus(500)

      res.redirect('/upload_todo')
    })
    
  })
})

router.get("/:id", (req, res) => {
  dbc.getOne(
    req.params.id,
    record => res.render("note_detail", { note: record }),
    () => res.sendStatus(404)
  )
})

module.exports = router;

