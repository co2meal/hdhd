/**
 * TODO List
 * cache
 * choose another source like google map geolocation api
 */

class GeoService {
  static getCurrentPosition() {
    return new Promise(function(resolve) {
      navigator.geolocation.getCurrentPosition(function(res) {
        resolve({
          longitude: res.coords.longitude,
          latitude: res.coords.latitude,
        })
      })
    })
  }
}

export default GeoService