const MongoClient = require('mongodb').MongoClient
const config = require('dotenv').config

config()
const connectMongoDB = () => MongoClient.connect(process.env.MONGODB).then(client=>client.db())
var whitelist = ['http://localhost:3000', 'http://example2.com']
const cors = require('cors')({
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
})

exports.signIn = (req, res) => cors(req, res, () => {
  connectMongoDB().then(db => {
    const query = {
      email: req.body.email
    }
    db.collection('users').findOne(query).then((user) => {
      if (!user) throw new Error("user not found")
      return user
    }).then((user) => {
      return res.status(200).send(user)
    }).catch((message) => {
      return res.status(500).send({messages: [message]})
    })
  })
})

exports.signUp = (req, res) => cors(req, res, () => {
  connectMongoDB().then(db => {
    const query = {
      email: req.body.email
    }
    db.collection('users').findOne(query).then((user) => {
      if (user) throw new Error("user already exist")
      return db.collection('users').insert(req.body)
    }).then(user => {
      return res.status(200).send(user)
    }).catch(message => {
      console.log(message)
      return res.status(500).send({messages: [message]})
    })
  })
})