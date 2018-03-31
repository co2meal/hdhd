import React from 'react'
import findHashTags from 'find-hashtags'
import * as Redux from 'react-redux'
import * as UI from 'semantic-ui-react'

import PostService from 'services/PostService'
import PostsMapContainer from './PostsMapContainer'
import GeoService from 'services/GeoService'

function mapStateToProps(state) {
  return {
    me: state.auth.me,
  }
}

class Dashboard extends React.Component {
  constructor() {
    super()

    this.defaultKeywords = ['히덕', '희덕']
    this.state = {
      keywords: this.defaultKeywords,
      writingText: '',
      errorMessages: null,
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateKeyword = this.updateKeyword.bind(this)
    this.setErrorMessages = this.setErrorMessages.bind(this)
  }

  handleTextChange(text) {
    this.setState({
      writingText: text,
    })
  }

  updateKeyword() {
    this.setState({
      keywords: findHashTags(this.state.writingText),
    })
  }

  handleSubmit() { // TODO: Complete Create
    this.setState({
      isLoading: true,
      errorMessages: null,
    })
    GeoService.getCurrentPosition().then((coords) => {
      return PostService.writePost({
        content: this.state.writingText,
        coordinates: coords,
      })
    }).catch((messages) => {
      this.setState({
        errorMessages: messages,
      })
    }).then(() => {
      this.setState({
        isLoading: false,
      })
    })
  }

  setErrorMessages(errorMessages) {
    this.setState({
      errorMessages,
    })
  }

  render() {
    const { writingText, errorMessages, keywords, isLoading } = this.state
    const { me } = this.props

    const writingKeywords = writingText
      ? findHashTags(writingText)
      : this.defaultKeywords
    return (
      <div>
        {/* Extract menu to component */}
        <UI.Menu size="large">
          <UI.Container>
            <UI.Menu.Item header content="대시보드"/>
            <UI.Menu.Menu position="right">
              <UI.MenuItem>
                <UI.Button primary> 이름: {me.email} </UI.Button>
              </UI.MenuItem>
            </UI.Menu.Menu>
          </UI.Container>
        </UI.Menu>
        <UI.Container>
          <UI.Form
            loading={isLoading}
            error={!!errorMessages}>
            <UI.Header as="h1">
              {writingKeywords.map(e => `#${e}`).join(' ')}
            </UI.Header>
            <UI.Form.TextArea // TODO: Change to query box.
              onChange={e => this.handleTextChange(e.target.value)}
              onKeyDown={e => (e.keyCode === 13 && (e.metaKey || e.ctrlKey))
                ? this.handleSubmit(e.target.value)
                : null}
              onBlur={this.updateKeyword}
              placeholder="#히덕 #희덕 해보세요"
              error={!!errorMessages}
              autoHeight/>
            <UI.Message
              error
              list={errorMessages} />
          </UI.Form>
          <PostsMapContainer
            keywords={keywords}
            writingText={writingText.length > 0
              ? writingText
              : '#히덕 #희덕 해보세요'}
            onError={this.setErrorMessages}/>
        </UI.Container>
      </div>
    )
  }
}

Dashboard = Redux.connect(mapStateToProps)(Dashboard)

export default Dashboard
