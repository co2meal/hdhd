import React from 'react'
import * as UI from 'semantic-ui-react'
import { compose, withProps } from "recompose"
import * as GoogleMaps from "react-google-maps"
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel"
import GeoService from 'services/GeoService'

const API_KEY = "AIzaSyAJVqwaKqdFDaiISh7Q_FUcNOdtTLKV1fk"

class MyMapComponent extends React.Component {
  state = {
    coords: {
      latitude: -34.397,
      longitude: 150.644,
    }
  }
  componentDidMount() {
    GeoService.getCurrentPosition().then((coords) => {
      console.log(coords)
      this.setState({
        coords
      })
    })
  }

  render() {
    return (
      <GoogleMaps.GoogleMap
        defaultZoom={8}
        center={{ lat: this.state.coords.latitude, lng: this.state.coords.longitude }}>

        <MarkerWithLabel
          position={{ lat: this.state.coords.latitude, lng: this.state.coords.longitude }}
          labelAnchor={new window.google.maps.Point(0, 0)}
          labelStyle={{backgroundColor: "rgba(255,255,0,0.3)", fontSize: "16px", padding: "16px", width: "150px"}}
          onClick={this.props.onMarkerClick}>
          <div> Where you are </div>
        </MarkerWithLabel>
      </GoogleMaps.GoogleMap>
    )
  }
}

MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places?key=${API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  GoogleMaps.withScriptjs,
  GoogleMaps.withGoogleMap
)(MyMapComponent)

class Dashboard extends React.Component {
  state = { activeItem: 'dashboard' }

  handleItemClick() {
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <UI.Menu>
          <UI.Menu.Item name='Dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} />
          <UI.Menu.Item name='New Post' active={activeItem === 'newPost'} onClick={this.handleItemClick} />
          <UI.Menu.Item name='Find Friends' active={activeItem === 'findFriends'} onClick={this.handleItemClick} />
        </UI.Menu>

        <MyMapComponent/>
      </div>
    )
  }
}
export default Dashboard