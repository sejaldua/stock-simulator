import React, { Component } from "react";
import "./App.css";

class TopStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
        };
        console.log(this.props);
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
                <span> {this.props.stock[0].toString()}</span><span className={this.getColor()}> ({this.getSign()}{this.props.stock[1].toString()}) </span>
            </div>
        );
    }
}
  
export {
    TopStock
}
  