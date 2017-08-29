import React from 'react';
import Navbar from './Navbar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    this.socket = io();
  }

  render() {
    return (
      <div className="app">
        <Navbar currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;
