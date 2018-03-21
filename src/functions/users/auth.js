const DatabaseUtils = require('./DatabaseUtils').DatabaseUtils
const cors = require('./RequestUtils').cors

exports.signIn = (req, res) => cors(req, res, () => {
  DatabaseUtils.connectMongoDB().then(db => {
    const query = {
      email: req.body.email
    }
    db.collection('users').findOne(query).then((user) => {
      if (!user) throw new Error("user not found")
      return user
    }).then((user) => {
      return res.status(200).send(user)
    }).catch((e) => {
      return res.status(500).send({messages: [e.message]})
    })
  })
})

exports.signUp = (req, res) => cors(req, res, () => {
  DatabaseUtils.connectMongoDB().then(db => {
    const query = {
      email: req.body.email
    }
    db.collection('users').findOne(query).then((user) => {
      if (user) throw new Error("user already exist")
      return db.collection('users').insert(req.body)
    }).then(user => {
      return res.status(200).send(user)
    }).catch(e => {
      console.log(e)
      return res.status(500).send({messages: [e.message]})
    })
  })
})