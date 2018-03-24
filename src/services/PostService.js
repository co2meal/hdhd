const GET_POST_URL = "http://us-central1-hdhd-197707.cloudfunctions.net/getPost"

class PostService {
  static getPost({keyword, coordinates}) {
    return fetch(GET_POST_URL, { // TODO: wrap fetch()
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keyword,
        coordinates,
      }),
    }).then(res => {
      return Promise.all([res.status !== 200, res.json()])
    }).then(([err, json]) => {
      if (err) {
        return Promise.reject(json.messages)
      }
      return json
    })
  }
}

export default PostService