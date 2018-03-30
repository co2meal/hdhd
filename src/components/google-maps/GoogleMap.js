import React from 'react'
import * as GoogleMaps from 'react-google-maps'
import { compose, withProps } from 'recompose'

const API_KEY = 'AIzaSyAJVqwaKqdFDaiISh7Q_FUcNOdtTLKV1fk'

class GoogleMap extends React.Component {
  render() {
    return (
      <GoogleMaps.GoogleMap
        defaultZoom={14}
        center={{ lat: this.props.coords.latitude, lng: this.props.coords.longitude }}
        children={this.props.children}>
      </GoogleMaps.GoogleMap>
    )
  }
}

GoogleMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places?key=${API_KEY}`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  GoogleMaps.withScriptjs,
  GoogleMaps.withGoogleMap
)(GoogleMap)

export default GoogleMap

