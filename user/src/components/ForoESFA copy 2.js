import React, { Component } from "react";
// import { Document, Page } from "react-pdf";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios"
// import { isMobile } from "react-device-detect";
export default class App extends Component {

  async componentDidMount() {
    // this.getCurses()
  }

  getCurses = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/users/userCr`);
    // console.log(res.data[0], "w wwwwww")
    // this.setState({
    //   cursesteacher: res.data[0].curses,
    //   report: res.data[0].cursesstd ? res.data[0].cursesstd : [],
    // });
  };


  render() {
    return (
      <>
        <button className="btn btn-light" onClick={this.getCurses()}>
          www
        </button>

      </>
    );
  }
}
