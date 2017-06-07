import React from 'react';
import { Link } from 'react-router';

export default (props) => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-5">
        </div>
        <div className="col-lg-2" id="nav-logo">
          <img src="files/img/logo.png" />
        </div>
        <div className="col-lg-5">
        </div>
      </div>
      <nav className="navbar navbar-default" id="nav">
        <div className="container-fluid">
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="#">Shop for Fish</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Region <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Africa</a></li>
                  <li><a href="#">Asia</a></li>
                  <li><a href="#">Australia</a></li>
                  <li><a href="#">Europe</a></li>
                  <li><a href="#">North America</a></li>
                  <li><a href="#">South America</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <form className="navbar-form" id="search">
                  <div className="form-group">
                    <input id="search-input" type="text" className="form-control" placeholder="Search Fish" />
                  </div>
                  <button id="search-btn" type="submit" className="btn btn-default">Submit</button>
                </form>
              </li>
              <li><a href="#">Login</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <span className="glyphicon glyphicon-shopping-cart"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Cart Item 1</a></li>
                  <li><a href="#">Cart Item 2</a></li>
                  <li><a href="#">Cart Item 3</a></li>
                  <li><a href="#">Cart Item 4</a></li>
                </ul>
              </li>
            </ul>
          </div>
      </nav>
    </div>
        )
}
