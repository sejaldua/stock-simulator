import React, { Component } from "react";
import LineChart from "./Line.js";
import "./App.css";

class TopStock extends Component {
    constructor(props) {
        super(props);
    }


    getSign = () => {
        if (this.props.stock[1] === 0)
            return "";
        return (this.props.stock[1] > 0) ? "+":"";
    }

    getColor = () => {
        if (this.props.stock[1] > 0)
            return "green";
        else if (this.props.stock[1] < 0)
            return "red";
        else
            return "white";
    }

    render() {
        return (
            <div class="topstock">
                <span> {this.props.stock[0].toString()}</span><span className={this.getColor()}> ({this.getSign()}{this.props.stock[1].toString()}%) </span>
                <LineChart ref="chart" data = { this.props.data }/>
            </div>
        );
    }
}
  
export {
    TopStock
}
  