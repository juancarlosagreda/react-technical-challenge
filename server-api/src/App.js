import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { grocery: [] };
  };

  componentDidMount() {
    let url = "http://localhost:8000/grocery"
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        let items = data.map((item, i) => {
          return (
            <div key={i}>
              <h3>Product: {item.productName}</h3>
              <p>Description: {item.productDescription}</p>
            </div>
          );
        })
        this.setState({ grocery: items });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    return (
      <div className="App">
        {this.state.grocery}
      </div>
    );
  }
}

export default App;
