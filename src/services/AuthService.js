const SIGN_IN_URL = "http://us-central1-hdhd-197707.cloudfunctions.net/signIn"
const SIGN_UP_URL = "http://us-central1-hdhd-197707.cloudfunctions.net/signUp"

class AuthService {
  static signIn({email, password}) {
    return fetch(SIGN_IN_URL, {
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
    return fetch(SIGN_UP_URL, {
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