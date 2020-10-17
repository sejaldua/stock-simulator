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
        return (this.props.stock[1] > 0) ? "+":"-";
    }

    render() {
        return (
            <div class="topstock">
                <p> {this.props.stock[0].toString()} ({this.getSign()}{this.props.stock[1].toString()}) </p>
            </div>
        );
    }
}
  
export {
    TopStock
}
  