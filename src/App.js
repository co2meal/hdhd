import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Reaicxx</h1>
        </header>
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
