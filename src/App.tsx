import * as React from 'react';
import './App.css';
import ComponentConnector from './ComponentConnector';

export interface Props {}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        < ComponentConnector />
      </div>
    );
  }
}

export default App;
