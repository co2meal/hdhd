const findHashtags = require('find-hashtags');

exports.writePost = (req, res, db) => {
  const keywords = findHashtags(req.body.content)
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
  const query = {
    keyword: { $all: [req.body.keyword] }, //TODO: Not safe
    location: { $near: {
      $geometry: {
        type: "Point",
        coordinates: [req.body.coordinates.longitude , req.body.coordinates.latitude ]
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