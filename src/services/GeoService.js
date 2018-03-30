/**
 * TODO List
 * cache
 * choose another source like google map geolocation api
 */

let promise
class GeoService {
  static getCurrentPosition() {
    if (promise === undefined) {
      promise = new Promise(function(resolve) {
        navigator.geolocation.getCurrentPosition(function(res) {
          resolve({
            longitude: res.coords.longitude,
            latitude: res.coords.latitude,
          })
        })
      })
    }
    return promise
  }
}

export default GeoService