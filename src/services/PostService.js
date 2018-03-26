import FetchService from './FetchService'

const GET_POST_URL = "https://us-central1-hdhd-197707.cloudfunctions.net/getPost"
const WRITE_POST_URL = "https://us-central1-hdhd-197707.cloudfunctions.net/writePost"

class PostService {
  static getPost({keyword, coordinates}) {
    return FetchService.fetch(GET_POST_URL, {
      body: JSON.stringify({
        keyword,
        coordinates,
      })
    })
  }
  static writePost({coordinates, content}) {
    return FetchService.fetch(WRITE_POST_URL, {
      body: JSON.stringify({
        coordinates,
        content,
      })
    })
  }
}

export default PostService