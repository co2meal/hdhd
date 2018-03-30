var express = require('express')
var backend = require('./backend.js')

var app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

for (const k of Object.keys(backend)) {
  app.post('/' + k, backend[k])
}

app.listen(3001, function() {
  window.console.log('Listening...')
})
