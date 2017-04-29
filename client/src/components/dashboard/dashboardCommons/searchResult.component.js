import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import { Link } from 'react-router';

class searchResult extends Component {
  render() {
    return (
      <div className="bodyInnards">
        <div className="row">
          <h1>401</h1>
          <p>What are you looking at!??</p>
          <div>
            <p>
              <Link to="/">
                Home page!
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default searchResult;
