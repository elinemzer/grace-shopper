import React from 'react';
import { Link } from 'react-router';

export default function Navbar (props) {

  const handleChange = props.handleChange;
  const inputValue = props.inputValue;
  const handleSubmit = props.handleSubmit;

  return (
    <div>
      <div className="row">
        <div className="col-lg-5">
        </div>
        <div className="col-lg-2" id="nav-logo">
          <Link to="/"><img src="files/img/logo.png" /></Link>
        </div>
        <div className="col-lg-5">
        </div>
      </div>
      <nav className="navbar navbar-default" id="nav">
        <div className="container-fluid">
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to='/products'>Shop Fish</Link></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle nav-region" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" id="nav-region">Region <span className="caret"></span></a>
                <ul id="nav-dropdown" className="dropdown-menu">
                  <Link to="/products/region/africa"><li><a className="drop-region" href="#">Africa</a></li></Link>
                  <Link to="/products/region/asia"><li><a className="drop-region" href="#">Asia</a></li></Link>
                  <Link to="/products/region/australia"><li><a className="drop-region" href="#">Australia</a></li></Link>
                  <Link to="/products/region/europe"><li><a className="drop-region" href="#">Europe</a></li></Link>
                  <Link to="/products/region/northamerica"><li><a className="drop-region" href="#">North America</a></li></Link>
                  <Link to="/products/region/southamerica"><li><a className="drop-region" href="#">South America</a></li></Link>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <form className="navbar-form" id="search" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input id="search-input" type="text" className="form-control" placeholder="Search Fish" onChange={handleChange} value={inputValue} />
                  </div>
                  <button id="search-btn" type="submit" className="btn btn-default" onSubmit={handleSubmit}>Search</button>
                </form>
              </li>

              {
                props.user &&
                props.user.email?
                  <li className="dropdown">
                        <a href="" id="nav-account" ClassName="dropdown-toggle nav-region yellow" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                          {props.user.firstName} {props.user.lastName} <span className="caret"></span>
                        </a>
                    <ul className="dropdown-menu" id="account-dropdown">
                      <Link to={`/users/${props.user.id}`}><li><a className="drop-region" href="#">My Account</a></li></Link>
                      <Link to="/products"><li onClick = {props.logoutUser}><a className="drop-region" href="#">Logout<span className="glyphicon glyphicon-remove" id="nav-logout"></span></a></li></Link>
                    </ul>
                  </li>
                :
                <li><Link to='/login'>
                    <p className="yellow">Login</p>
                    </Link>
                </li>
              }

              <li className="dropdown">
                <Link to='/cart'>
                  <span className="glyphicon glyphicon-shopping-cart" />
                </Link>
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
