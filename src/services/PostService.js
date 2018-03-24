import FetchService from './FetchService'

const GET_POST_URL = "http://us-central1-hdhd-197707.cloudfunctions.net/getPost"

class PostService {
  static getPost({keyword, coordinates}) {
    return FetchService.fetch(GET_POST_URL, {
      body: JSON.stringify({
        keyword,
        coordinates
      })
    })
  }
}

export default PostService