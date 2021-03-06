import React from "react";
import { connect } from "react-redux";
import { logout } from "../../_actions/auth_actions";
import "./header.css";

@connect(store => {
  return {
    logout: store.logout
  };
})
class Header extends React.Component {
  handleLogout = () => {
    this.props.dispatch(logout(this.props.history));
  };
  render() {
    return (
      <header className="header">
        <div className="navbar-item logo">ZingniZ</div>
        <nav>
          <div class="nav-links animated fadeIn">
            <a class="nav-btn" href="#" onClick={this.handleLogout}>
              Logout
            </a>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
