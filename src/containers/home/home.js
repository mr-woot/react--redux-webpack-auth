import React from "react";

import Header from "../../components/header/header";
import Content from "../../components/content/content";
import Footer from "../../components/footer/footer";

import "./home.css";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="home-wrap">
          <Header key="header" />
          <Content key="content" />
          {/* <Footer key="footer" /> */}
        </div>
      </div>
    );
  }
}

export default Home;
