import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './menu.js';
import Footer from './footer.js';
import Contact from './contact.js';
import Home from './home.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="container">
            <Menu />
            <Route exact path="/" component={Home} />
            <Route exact path="/contact" component={Contact} />
            <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
