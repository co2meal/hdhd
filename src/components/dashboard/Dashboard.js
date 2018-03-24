import React from 'react'
import findHashTags from "find-hashtags"
import * as Redux from 'react-redux'
import * as UI from 'semantic-ui-react'

import PostsMapContainer from './PostsMapContainer'

function mapStateToProps(state) {
  return {
    me: state.auth.me,
  }
}
class Dashboard extends React.Component {
  defaultKeywords = ["히덕", "희덕"]
  state = {
    keywords: this.defaultKeywords,
    writingText: "",
    errorMessages: null,
  }

  constructor() {
    super()
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateKeyword = this.updateKeyword.bind(this)
    this.onError = this.onError.bind(this)
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

  handleSubmit(text) { // TODO: Complete Create
    console.log(text)
  }

  onError(errorMessages) {
    this.setState({
      errorMessages
    })
  }

  render() {
    const { writingText, errorMessages, keywords } = this.state
    const { me } = this.props

    const writingKeywords = !!writingText
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
            error={!!errorMessages}>
            <UI.Header as="h1">
              {writingKeywords.map(e => `#${e}`).join(" ")}
            </UI.Header>
            <UI.Form.TextArea
              onChange={e => this.handleTextChange(e.target.value)}
              onKeyDown={e => (e.keyCode === 13 && (e.metaKey || e.ctrlKey))
                ? this.handleSubmit(e.target.value)
                : null}
              onBlur={this.updateKeyword}
              placeholder="#히덕 #희덕 해보세요"
              autoHeight/>
            <UI.Message
              error
              list={errorMessages}
            />
            <PostsMapContainer
              keywords={keywords}
              writingText={writingText.length > 0
                ? writingText
                : "#히덕 #희덕 해보세요"}
              onError={this.onError}/>
          </UI.Form>
        </UI.Container>
      </div>
    )
  }
}

Dashboard = Redux.connect(mapStateToProps)(Dashboard)

export default Dashboard