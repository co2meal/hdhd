import FetchService from './FetchService'

const SIGN_IN_URL = "http://us-central1-hdhd-197707.cloudfunctions.net/signIn"
const SIGN_UP_URL = "http://us-central1-hdhd-197707.cloudfunctions.net/signUp"

class AuthService {
  static signIn({email, password}) {
    return FetchService.fetch(SIGN_IN_URL, {
      body: JSON.stringify({
        email,
        password,
      }),
    })
  }

  static signUp({email, password, passwordConfirmation, username}) {
    return FetchService.fetch(SIGN_UP_URL, {
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    })
  }
}

export default AuthService