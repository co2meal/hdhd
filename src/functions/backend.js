const DatabaseUtils = require('./DatabaseUtils').DatabaseUtils
const cors = require('./RequestUtils').cors

Object.assign(exports, require('./auth.js'))
Object.assign(exports, require('./post.js'))

for (const key of Object.keys(exports)) {
  const oldFn = exports[key]
  exports[key] = (req, res) => cors(req, res, () => {
    window.console.log('%s %s', new Date(), req.url)
    DatabaseUtils.connectMongoDB().then(db => {
      oldFn(req, res, db)
    }).catch(err => {
      window.console.error(err)
    })
  })
}
