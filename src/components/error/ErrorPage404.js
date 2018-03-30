import React from 'react'

class ErrorPage404 extends React.Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <RouterDOM.Link to="/">
            <Button secondary={true}>
              404ERROR!!!!
            </Button>
          </RouterDOM.Link>
        </p>
      </div>
    )
  }
}

export default ErrorPage404