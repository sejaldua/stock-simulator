import React, { Component } from "react";
import { Rnd } from "react-rnd";
import { Tabs } from "@feuer/react-tabs";
import "./App.css";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          stocks: {},
          rel_change: {},
          top_stocks: [],
          test: "",
          connection: "false",
          width: 800,
          height: 600,
          x: 300,
          y: 100,
        };
    }

    getData = () => {
      fetch("http://localhost:6789/stocks")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("TESTING");
          this.setState({
            connection: "true",
            stocks: result
          });
          this.updateTest();
          this.updateRelChange();
        })
    }

    componentDidMount() {
      this.getData();
      setInterval(this.getData, 3000);
    }

    updateTest = () => {
      var data = this.state.stocks;
      this.setState({test: data["stocks"][0]["prices"][0]["price"].toString()});
    }

    updateRelChange = () => {
      var data = this.state.stocks["stocks"];
      var new_rel_change = {};
      var new_stock_rel_change = {};
      var stock_name;
      data.forEach(item => {
        stock_name = item["name"];
        new_stock_rel_change = {};
        if (stock_name in this.state.rel_change) {
          new_stock_rel_change["orig"] = (this.state.rel_change)[stock_name]["orig"];
        }
        else {
          new_stock_rel_change["orig"] = item["prices"][0]["price"];
        }
        new_stock_rel_change["curr"] = item["prices"][item["prices"].length-1]["price"];
        new_stock_rel_change["delta"] = ((new_stock_rel_change["curr"] - new_stock_rel_change["orig"]) / new_stock_rel_change["orig"]).toFixed(2);
        console.log(new_stock_rel_change);
        new_rel_change[stock_name] = new_stock_rel_change;
      })
      this.setState({rel_change: new_rel_change});
    }

    getTopStocks = () => {
      var dict = this.state.rel_change;
      var items = [];
      for (var key in dict) {
        items.push([ key, parseFloat(dict[key]["delta"])]);
      }
      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
      });

      return items.slice(0, 10);
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
                    <div style={{ padding: 10 }}>
                    </div>
                    <p>{this.state.test}</p>
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
