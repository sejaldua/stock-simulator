import React, { Component } from "react";
import logo from "./logo.svg";
import { Rnd } from "react-rnd";
import { Tabs } from "@feuer/react-tabs";
import "./App.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          apiResponse: "", 
          width: 800,
          height: 600,
          x: 300,
          y: 100
        };
    }

    // handleSizeChanged = size => {
    //   this.setState({ size });
    // };

    callAPI() {
        fetch("http://localhost:6789/stocks")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
          <Rnd
          size={{ width: this.state.width, height: this.state.height }}
          position={{ x: this.state.x, y: this.state.y }}
          onDragStop={(e, d) => {
            this.setState({ x: d.x, y: d.y });
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            this.setState({
              width: ref.style.width,
              height: ref.style.height,
              ...position
            });
          }} className="container">
              <div className="App">
              <Tabs
                  tabsProps={{
                    style: {
                      textAlign: "left"
                    }
                  }}
                  activeTab={{
                    id: "tab1"
                  }}
                >
                  <Tabs.Tab id="tab1" title="Top Stocks">
                    <div style={{ padding: 10 }}>This is tab 1</div>
                  </Tabs.Tab>
                  <Tabs.Tab id="tab2" title="By Sector">
                    <div style={{ padding: 10 }}>This is tab 2</div>
                  </Tabs.Tab>
                </Tabs>
                {/* <p className="App-intro">{this.state.apiResponse}</p> */}
              </div>
            </Rnd>
          //  </ResizeProvider>
        );
    }
}

export default App;
