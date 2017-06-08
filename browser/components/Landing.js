import React from 'react';
import { Link } from 'react-router';

export default function Landing () {
  return (
    <div>
      <div className="fullscreen-bg">
        <video loop muted autoPlay poster="img/videoframe.jpg" className="fullscreen-bg__video">
            <source src="files/img/bgmv.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container-fluid">
        <div className="row homeLogo">
          <div className="col-lg-5">
          </div>
          <div className="col-lg-2">
            <img className="landing-img" src="/files/img/logo.png" />
            <Link to="/"><h3 id="landing-shop">Shop Fish</h3></Link>
          </div>
          <div className="col-lg-5">
          </div>
        </div>
      </div>
    </div>
  )
}

