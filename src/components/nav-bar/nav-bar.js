import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./nav-bar.scss";
// TODO @SONIA

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      sticky: false
    };
    this.mobileMenuRef = React.createRef();

  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 0) {
        this.setState({ sticky: true });
      } else {
        this.setState({ sticky: false });
      }
    });
  }

  openMobileMenu = () => {
    if (this.mobileMenuRef.current.style.display !== "none") {
      this.mobileMenuRef.current.style.display = "none";
    } else {
      this.mobileMenuRef.current.style.display = "block";
    }
  }
  render() {
    let { pathname } = this.props.history.location;
    return (
      <header className={`nav-bar ${(this.state.sticky || pathname !== "/home") ? 'sticky' : ''}`} >
        <div className="nav-bar__container--web">
          <ul>
            <li className="logo">
              <Link to="/home">Airtasker</Link>
            </li>
            <li>
              <div className="nav-bar__button--pink">
                <Link to={`${pathname}/post`}>Post a Task</Link>
              </div>
            </li>
            <li>
              <Link to="/browse-tasks">Browse Tasks</Link>
            </li>
          </ul>
          {!this.props.user.email ?
            <ul>
              <li>
                <div className="nav-bar__button--transparent">
                  <Link to={`${pathname}/signup`}>Sign Up</Link>
                </div>
              </li>
              <li>
                <div className="nav-bar__button--transparent">
                  <Link to={`${pathname}/login`}>Login</Link>
                </div>
              </li>
            </ul>
            :
            <ul>
              <div className="nav-bar__user">
                <li>
                  <Link to="/my-tasks">My Tasks</Link>
                </li>
                <li>
                  <Link to="/account/dashboard">Account</Link>
                </li>
                <li>
                  <Link to="/home" onClick={this.props.logoutUser}>Log Out</Link>
                </li>
              </div>
            </ul>
          }
        </div>

        <div className="nav-bar__container--mobile">
          <ul className="nav-bar__header">
            <li className="menu-icon" onClick={this.openMobileMenu}>
              <FontAwesomeIcon icon={faBars} />
            </li>
            <li className="logo">
              <Link to="/home">Airtasker</Link>
            </li>
            <li>
              <div className="nav-bar__button--pink">
                <Link to={`${pathname}/post`}>+</Link>
              </div>
            </li>
          </ul>
          <ul className="nav-bar__menu" ref={this.mobileMenuRef}>
            <li>
              <Link to="/browse-tasks">Browse Tasks</Link>
            </li>
            {
              !this.props.user.email ?
                <>
                  <li>
                    <Link to={`${pathname}/signup`}>Sign Up</Link>
                  </li>
                  <li>
                    <Link to={`${pathname}/login`}>Login</Link>
                  </li>
                </>
                :
                <>
                  <li>
                    <Link to="/my-tasks">My Tasks</Link>
                  </li>
                  <li>
                    <Link to="/account/dashboard">Account</Link>
                  </li>
                  <li>
                    <Link to="/home" onClick={this.props.logoutUser}>Log Out</Link>
                  </li>
                </>
            }
          </ul>
        </div>

      </header>
    );
  }
}

export default connect(state => ({ user: state.user }), { logoutUser })(
  withRouter(NavBar)
);
