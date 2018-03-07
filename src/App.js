import React, { Component } from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <Button primary={true}>
            To get started, edit <code>src/App.jss</code> and se to relodi.
          </Button>
        </p>
      </div>
    );
  }
}

export default App;
