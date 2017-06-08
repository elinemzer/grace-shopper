import React from 'react';
import { Link } from 'react-router';

export default function Home () {
  return (
    <div id="home-page">
      <img src="files/img/homebg.jpg" />
      <div className="shader col-6-xs"></div>
      <div className="home-container default-container">
        <h1 id="home-title">Pisces</h1>
        <h3 id="home-subtitle">Aquascaping</h3>
        <Link to="/products"><h5>Shop Now  > </h5></Link>
      </div>
    </div>
  )
}
