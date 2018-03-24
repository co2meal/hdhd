class FetchService {
  static fetch(url, options) {
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    }

    return fetch(url, options).then(res => {
      return Promise.all([res.status !== 200, res.json()])
    }).then(([err, json]) => {
      if (err) {
        return Promise.reject(json.messages)
      }
      return json
    })
  }
}

export default FetchService