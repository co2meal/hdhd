const DatabaseUtils = require('./DatabaseUtils').DatabaseUtils
const findHashtags = require('find-hashtags');
const cors = require('./RequestUtils').cors

exports.writePost = (req, res) => cors(req, res, () => {
  const keywords = findHashtags(req.body.content)
  const post = {
    keyword: keywords,
    location: {
      type: "Point",
      coordinates: [req.body.coordinates.longitude, req.body.coordinates.latitude],
    },
    content: req.body.content
  }

  DatabaseUtils.connectMongoDB().then(db => {
    db.collection('posts').insertOne(post).then(post => {
      return res.status(200).send(post)
    }).catch(e => {
      return res.status(500).send({messages: [e.message]})
    })
  })
})

// TODO: find better way to handle errors
// Cand. 1: wrap it in backend.js
exports.getPost = (req, res) => cors(req, res, () => {
  const query = {
    keyword: { $all: [req.body.keyword] },
    location: { $near: {
      $geometry: {
        type: "Point",
        coordinates: [req.body.coordinates.longitude , req.body.coordinates.latitude ]
      },
      $maxDistance: 5000, // within 5 km
    }}
  }

  DatabaseUtils.connectMongoDB().then(db => {
    db.collection('posts').find(query).toArray().then(posts => {
      return res.status(200).send(posts)
    }).catch(e => {
      return res.status(500).send({ messages: [ e.message ] })
    })
  })
})