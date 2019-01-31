import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OtherPage extends Component {
  render() {
    return (
      <div>
        <span>Im that other page</span>
        <Link to="/">Go back home</Link>
      </div>
    );
  }
}

export default OtherPage;
