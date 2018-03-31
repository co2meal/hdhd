import React from 'react'
import * as RouterDOM from 'react-router-dom'
import * as UI from 'semantic-ui-react'

class Welcome extends React.Component {
  render() {
    return (

      <div className="App">
        <p className="App-intro">
          <h1> Welcome! </h1>
          <RouterDOM.Link to="/">
            <UI.Button secondary={true}>
              Go to main
            </UI.Button>
          </RouterDOM.Link>
        </p>
      </div>

    )
  }
}
export default Welcome
