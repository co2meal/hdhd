const findHashtags = require('find-hashtags')

exports.writePost = (req, res, db) => {
  const keywords = findHashtags(req.body.content)
  if (keywords.length === 0) {
    return res.status(500).send({messages: ["Message should have hashtags"]})
  }
  const post = {
    keyword: keywords,
    location: {
      type: "Point",
      coordinates: [req.body.coordinates.longitude, req.body.coordinates.latitude],
    },
    content: req.body.content
  }

  db.collection('posts').insertOne(post).then(output => {
    return res.status(200).send(output)
  }).catch(e => {
    return res.status(500).send({messages: [e.message]})
  })
}

// TODO: find better way to handle errors
// Cand. 1: wrap it in backend.js
exports.getPost = (req, res, db) => {
  if (req.body.keyword.length === 0) {
    return res.status(200).send([])
  }

  const query = {
    keyword: { $all: req.body.keyword },
    location: { $near: {
      $geometry: {
        type: "Point",
        coordinates: [ req.body.coordinates.longitude , req.body.coordinates.latitude ]
      },
      $maxDistance: 5000, // within 5 km
    }}
  }

  db.collection('posts').find(query).toArray().then(posts => {
    return res.status(200).send(posts)
  }).catch(e => {
    return res.status(500).send({ messages: [ e.message ] })
  })
}