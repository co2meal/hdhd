var whitelist = ['http://localhost:3000', 'https://hdhd.netlify.com']
const cors = require('cors')({
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error({messages: 'Not allowed by CORS'}))
    }
  }
})

exports.cors = cors