import React, { Component } from "react";
import Select from 'react-select-me';
import 'react-select-me/lib/ReactSelectMe.css';
import { TopStock } from "./TopStock";
import "./App.css";

const options = [
    { value: 1, label: 'Sector 1' },
    { value: 2, label: 'Sector 2' },
    { value: 3, label: 'Sector 3' },
    { value: 4, label: 'Sector 4' }
  ];

const d = {1: 'Sector 1', 2: 'Sector 2', 3: 'Sector 3', 4: 'Sector 4'};
  

class SectorFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { value: options[0] };
        this.onChange = this.onChange.bind(this);

    }

    onChange(value) {
        this.setState({ value });
        console.log(this.state.value);
    }

    getSectors = () => {
        var sector_name = this.state.value.label;
        var dict = this.props.rel_change;
        var sector_stocks = this.props.sectors[sector_name];
        console.log(dict);
        var items = [];
        sector_stocks.map(stock => {
            items.push([ stock, parseFloat(dict[stock]["delta"])]);
        });
        // Sort the array based on the relative percent change
        items.sort(function(first, second) {
            return second[1] - first[1];
        });
        return items;
    }

    render() {
        return (
            <div style={{ padding: "2px"}} className="subcontainer">
                <Select options={options} value={this.state.value.value} onChange={this.onChange} />
                {this.getSectors().map(stock => (
                <TopStock stock = { stock } />
                ))}
            </div>
        );
    }
}
  
export {
    SectorFilter
}
  