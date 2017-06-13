import React from 'react';
import { Link } from 'react-router';

export default function Home () {
  return (
    <div id="home-page">
      <img src="files/img/adminfish.jpg" />
      <div className="shader col-6-xs"></div>
      <div className="home-container default-container">
        <h3 id="home-subtitle">Manage Your Site</h3>
        <Link to="/admin/users"><h5>Users<span className="glyphicon glyphicon-chevron-right" id="home-arrow" /></h5></Link>
        <Link to="/admin/products"><h5>Products<span className="glyphicon glyphicon-chevron-right" id="home-arrow" /></h5></Link>
        <Link to="/admin/orders"><h5>Orders<span className="glyphicon glyphicon-chevron-right" id="home-arrow" /></h5></Link>
      </div>
    </div>
  )
}
