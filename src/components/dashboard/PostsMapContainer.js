import React from 'react'
import ReactMarkdown from 'react-markdown'
import _ from 'lodash'
import * as GoogleMaps from 'react-google-maps'
import * as UI from 'semantic-ui-react'

import GeoService from 'services/GeoService'
import PostService from 'services/PostService'
import GoogleMap from 'components/google-maps/GoogleMap'

class PostsMapContainer extends React.Component {

  constructor() {
    super()
    this.state = {
      coords: { // TODO: Put the last location that the device remembers.
        latitude: -34.397,
        longitude: 150.644,
      },
      posts: [],
      isLoading: true,
    }
  }

  updateCoords() {
    GeoService.getCurrentPosition().then(coords => {
      this.setState({
        coords: coords,
      })
    })
  }

  fetchPosts(keywords) {
    this.props.onError(null) // TODO: defaultProp
    this.setState({
      isLoading: true,
    })

    GeoService.getCurrentPosition().then((coords) => {
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
    }).then(() => {
      this.setState({
        isLoading: false,
      })
    })
  }

  componentDidMount() {
    const { keywords } = this.props
    this.updateCoords()
    this.fetchPosts(keywords)
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.keywords, nextProps.keywords)) {
      this.fetchPosts(nextProps.keywords)
    }
  }

  render() {
    const { isLoading, coords, posts } = this.state
    const { writingText } = this.props
    const writingPost = {
      _id: 'writingPost',
      content: writingText,
      location: {
        coordinates: [coords.longitude, coords.latitude],
      },
    }
    return (
      <UI.Segment>
        <UI.Dimmer active={isLoading}>
          <UI.Loader content="불러오는 중"/>
        </UI.Dimmer>
        <GoogleMap coords={coords}>
          <PostsMarkersContainer
            posts={posts}
            icon="https://cdn1.iconfinder.com/data/icons/business-13/6144/20-32.png"/>
          <PostsMarkersContainer posts={[writingPost]} />
        </GoogleMap>
      </UI.Segment>
    )
  }
}

class PostMarker extends React.Component {
  constructor() {
    super()
    this.state = {
      isClosed: false,
    }
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle() {
    this.setState({
      isClosed: !this.state.isClosed,
    })
  }

  render() {
    const { isClosed } = this.state
    const { post } = this.props
    return (
      <GoogleMaps.Marker
        {...this.props}
        position={{lng: post.location.coordinates[0], lat: post.location.coordinates[1]}}
        onClick={this.onToggle}>
        {isClosed || <GoogleMaps.InfoWindow onCloseClick={this.onToggle} >
          <ReactMarkdown source={post.content} />
        </GoogleMaps.InfoWindow>}
      </GoogleMaps.Marker>
    )
  }
}

class PostsMarkersContainer extends React.Component {
  render() {
    return (
      <div>
        {this.props.posts.map(post => (
          <PostMarker {...this.props} key={post._id} post={post}/>
        ))}
      </div>
    )
  }
}

export default PostsMapContainer
