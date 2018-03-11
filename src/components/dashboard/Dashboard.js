import React from 'react'
import * as RouterDOM from 'react-router-dom'
import * as UI from 'semantic-ui-react'

class Dashboard extends React.Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <RouterDOM.Link to="/">
            <UI.Button secondary={true}>
              Dashboard
            </UI.Button>
          </RouterDOM.Link>
        </p>
      </div>
    );
  }
}
export default Dashboard