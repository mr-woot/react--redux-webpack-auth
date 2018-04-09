import React from "react";

import Header from "../../components/header/header";
import Content from "../../components/content/content";
import Footer from "../../components/footer/footer";

import "./home.css";

class Home extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="home">
        <div className="home-wrap">
          <Header key="header" history={history} />
          <Content key="content" history={history} />
          {/* <Footer key="footer" /> */}
        </div>
      </div>
    );
  }
}

export default Home;
