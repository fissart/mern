import React, { Component } from "react";
// import { Document, Page } from "react-pdf";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { isMobile } from "react-device-detect";
export default class App extends Component {
  state = {
    numPages: null,
    file: "",
    pageNumber: 1,
  };

  uuu = ({ numPages }) => {
    this.setState({ numPages });
    console.log(this.state.numPages);
  };

  ww = (ww) => {
    this.setState({
      file: ww,
      pageNumber: 1,
    });
    console.log(this.state.file);
  };

  prev = () => this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
  next = () => this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    return (
      <>
        <div className="container bg-light p-1 my-3 text-center">
          <div class="btn-group" role="group" aria-label="First group">
            <a
              className="btn btn-info"
              href={"#demo"}
              data-toggle="collapse"
              onClick={() => this.ww("ww.pdf")}
            >
              ww
            </a>
            <a
              className="btn btn-info"
              href={"#demo"}
              data-toggle="collapse"
              onClick={() => this.ww("www.pdf")}
            >
              www
            </a>
            <a
              className="btn btn-info"
              href={"#demo"}
              data-toggle="collapse"
              onClick={() => this.ww("sample.pdf")}
            >
              sample
            </a>
          </div>
          <div
            className={
              this.state.numPages
                ? "container text-center bg-info p-1 mt-1 collapse "
                : "d-none"
            }
            id={"demo"}
          >
            <div class="btn-group mb-1" role="group" aria-label="First group">
              {this.state.pageNumber === 1 ? (
                <button className="btn btn-light" disabled>
                  <MdKeyboardArrowLeft />
                </button>
              ) : (
                <button className="btn btn-light" onClick={this.prev}>
                  <MdKeyboardArrowLeft />
                </button>
              )}
              {this.state.pageNumber === this.state.numPages ? (
                <button className="btn btn-light" disabled>
                  <MdKeyboardArrowRight />
                </button>
              ) : (
                <button className="btn btn-light" onClick={this.next}>
                  <MdKeyboardArrowRight />
                </button>
              )}
            </div>

            {this.state.numPages ? (
              <div class="text-white">
                {this.state.numPages}--{this.state.pageNumber}
              </div>
            ) : null}

            <div className="container d-flex justify-content-center align-items-center">
              {/* <Document
                className="m-auto"
                file={`${process.env.REACT_APP_URL}/tasks/${this.state.file}`}
                onLoadSuccess={this.uuu}
                onLoadError={this.state.file}
              >
                <Page pageNumber={this.state.pageNumber} width={600} />
              </Document> */}
            </div>
            <a
              className="btn btn-light mt-1"
              href={`${process.env.REACT_APP_URL}/tasks/${this.state.file}`}
            >
              Descargar
            </a>
          </div>
        </div>
      </>
    );
  }
}
