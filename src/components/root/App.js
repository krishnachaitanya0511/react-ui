import React, { Component } from 'react';
import Header from '../layout/header/Header';
import Footer from '../layout/footer/Footer';
import Routes from '../routes/Routes';
import './App.css'

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header />
          <Routes />
          <Footer />
        </div>
    );
  }
}

export default App;
