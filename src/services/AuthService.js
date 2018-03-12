const GET_URL = "http://us-central1-hdhd-197707.cloudfunctions.net/get"
const SET_URL = "http://us-central1-hdhd-197707.cloudfunctions.net/set"

class AuthService {
  static signIn({email, password}) {
    return fetch(GET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
  }

  static signUp({email, password, passwordConfirmation, username}) {
    // TODO: Add a validation Logic.
    return fetch(SET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    })
  }
}

export default AuthService