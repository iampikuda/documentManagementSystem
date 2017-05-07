import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import { Link } from 'react-router';

/**
 * @class NotFound
 * @extends {Component}
 */
class NotFound extends Component {
  /**
   * Renders not found page
   * @returns {void}
   * @memberof NotFound
   */
  render() {
    return (
      <div className="bodyInnards">
        <div className="row">
          <h1>404</h1>
          <p>HUH!??</p>
          <div>
            <p>
              <Link to="/">
                Go back to home page
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
