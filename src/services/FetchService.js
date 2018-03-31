class FetchService { // TODO: Accept path instead of url
  static fetch(url, options) {
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    }

    return fetch(url, options).then(res => {
      return Promise.all([res.status !== 200, res.json()])
    }).catch(e => {
      return [true, {messages: [e.message]}]
    }).then(([err, json]) => {
      if (err) {
        return Promise.reject(json.messages)
      }
      return json
    })
  }
}

export default FetchService
