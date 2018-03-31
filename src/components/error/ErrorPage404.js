import React from 'react'
import * as RouterDOM from 'react-router-dom'
import * as UI from 'semantic-ui-react'

class ErrorPage404 extends React.Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <RouterDOM.Link to="/">
            <UI.Button secondary={true}>
              404ERROR!!!!
            </UI.Button>
          </RouterDOM.Link>
        </p>
      </div>
    )
  }
}

export default ErrorPage404
