const GET_URL = "http://us-central1-hdhd-197707.cloudfunctions.net/get"
const SET_URL = "http://us-central1-hdhd-197707.cloudfunctions.net/set"

class AuthService {
  constructor() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  login({email, password}, callback) {
    fetch(GET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: email,
        entity: {
          key: email,
          email,
          password,
        }
      }),
    }).then((res) => {
      if (res.status === 200) {
        this.authenticated = true
        return Promise.all([false, res.json()])
      } else {
        this.authenticated = false
        return Promise.all([true, res.json()])
      }
    }).then(([err, data]) => {
      callback(err, data)
    })
  }

  signup({email, password}, callback) {
    fetch(SET_URL, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: email,
        entity: {
          key: email,
          email,
          password,
        }
      }),
    }).then((d) => {
      callback(d)
    })

  }
}

export default new AuthService()