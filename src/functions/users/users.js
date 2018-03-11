const Datastore = require('@google-cloud/datastore');
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
});

const datastore = Datastore();

exports.get = (req, res) => cors(req, res, () => {
  const key = datastore.key(['users', req.body.key])

  datastore.get(key)
    .then(([entity]) => {
      if (!entity) {
        throw new Error(`No entity found for key ${key.path.join('/')}.`);
      }

      res.status(200).send(entity);
    })
    .catch((err) => {
      res.status(500).send({messages: [err.message]});
      return Promise.reject(err);
  })
})

exports.set = (req, res) => cors(req, res, () => {
  const key = datastore.key(['users', req.body.key])
  const user = Object.assign({}, req.body, {
    key,
  })
  datastore.save(user)
    .then(() => res.status(200).send(`Entity ${key.path.join('/')} saved.`))
    .catch((err) => {
      res.status(500).send({messages: [err.message]});
      return Promise.reject(err);
  })
})