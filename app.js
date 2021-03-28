const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.use('/static', express.static('public'))

const notes = require('./db')

app.get('/', (req, res) => {
    //const notes = ['Dummy data 1', 'Dummy data 2', 'Dummy data 3']
    res.render('home', {notes:notes})
})

app.get('/upload_todo', (req, res) => {
    res.render('upload_todo')
})

// app.get('/all_notes', (req, res) => {
//     res.render('all_notes', {notes:notes})
// })

// app.get('/notes', (req, res) => {
//     //const notes = ['Dummy data 1', 'Dummy data 2', 'Dummy data 3']
//     res.render('all_notes',)
// })

app.get('/notes/detail', (req, res) => {
    res.render('notes_detail')
})

app.listen(8000, err => {
    if (err) throw err
    console.log('App is running ...')
})