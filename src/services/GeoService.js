/**
 * TODO List
 * cache
 * choose another source like google map geolocation api
 */

class GeoService {
  static getCurrentPosition() {
    return new Promise(function(resolve) {
      navigator.geolocation.getCurrentPosition(function(res) {
        resolve(res.coords)
      })
    })
  }
}

export default GeoService