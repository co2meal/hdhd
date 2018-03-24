import React from 'react'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import * as GoogleMaps from "react-google-maps"
import * as UI from 'semantic-ui-react'

import GeoService from 'services/GeoService'
import PostService from 'services/PostService'
import GoogleMap from 'components/google-maps/GoogleMap'


class PostsMapContainer extends React.Component {
  state = {
    coords: { // TODO: Put the last location that the device remembers.
      latitude: -34.397,
      longitude: 150.644,
    },
    posts: [],
    isLoading: true,
  }

  updateCoords() {
    this.coordsPromise = GeoService.getCurrentPosition()

    this.coordsPromise.then(coords => {
      this.setState({
        coords: coords
      })
    })
  }

  fetchPosts(keywords) {
    this.props.onError(null)
    this.setState({
      isLoading: true,
    })

    this.coordsPromise.then((coords) => {
      return PostService.getPost({
        keyword: keywords,
        coordinates: coords,
      })
    }).then(posts => {
      this.setState({
        posts: posts,
      })
    }).catch(errorMessages => {
      this.props.onError(errorMessages)
    }).finally(() => {
      this.setState({
        isLoading: false,
      })
    })
  }

  componentDidMount() {
    this.updateCoords()
    this.fetchPosts(this.props.keywords)
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.keywords, nextProps.keywords)) {
      this.fetchPosts(nextProps.keywords)
    }
  }

  render() {
    const writingPost = {
      _id: "writingPost",
      content: this.props.writingText,
      location: {
        coordinates: [this.state.coords.longitude, this.state.coords.latitude],
      }
    }
    return (
      <UI.Segment>
        <UI.Dimmer active={this.state.isLoading}>
          <UI.Loader content="불러오는 중"/>
        </UI.Dimmer>
        <GoogleMap coords={this.state.coords}>
          <PostsMarkersContainer
            posts={this.state.posts}
            icon="https://cdn1.iconfinder.com/data/icons/business-13/6144/20-32.png"/>
          <PostsMarkersContainer posts={[writingPost]} />
        </GoogleMap>
      </UI.Segment>
    )
  }
}

class PostMarker extends React.Component {
  state = {
    isClose: false,
  }

  constructor() {
    super()
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle() {
    this.setState({
      isClose: !this.state.isClose
    })
  }

  render() {
    return (
      <GoogleMaps.Marker
        {...this.props}
        position={{lng: this.props.post.location.coordinates[0], lat: this.props.post.location.coordinates[1]}}
        onClick={this.onToggle}>
        {this.state.isClose || <GoogleMaps.InfoWindow onCloseClick={this.onToggle} >
          <ReactMarkdown source={this.props.post.content} />
        </GoogleMaps.InfoWindow>}
      </GoogleMaps.Marker>
    )
  }
}

class PostsMarkersContainer extends React.Component {
  render() {
    return (
      <div>
        {this.props.posts.map(p => (
          <PostMarker
            key={p._id}
            post={p}/>
        ))}
      </div>
    )
  }
}

export default PostsMapContainer