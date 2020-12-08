import React, {Component} from "react";
import "./LineChart.css";

class LineChart extends Component {

  // GET MAX & MIN X
  getMinX() {
    const {data} = this.props;
    return data[0].time;
  }
  getMaxX() {
    const {data} = this.props;
    return data[data.length - 1].time;
  }
  // GET MAX & MIN Y
  getMinY() {
    const {data} = this.props;
    return data.reduce((min, p) => p.price < min ? p.price : min, data[0].price);
  }
  getMaxY() {
    const {data} = this.props;
    return data.reduce((max, p) => p.price > max ? p.price : max, data[0].price);
  }
  // GET SVG COORDINATES
  getSvgX(x) {
    const {svgWidth} = this.props;
    return (x / this.getMaxX() * svgWidth);
  }
  getSvgY(y) {
    const {svgHeight} = this.props;
    return svgHeight - (y / this.getMaxY() * svgHeight);
  }
  // BUILD SVG PATH
  makePath() {
    console.log(this.props.data);
    const {data} = this.props;
    const color = "#FFFFFF";
    let pathD = "M " + this.getSvgX(data[0].time) + " " + this.getSvgY(data[0].price) + " ";

    pathD += data.map((point, i) => {
      return "L " + this.getSvgX(point.time) + " " + this.getSvgY(point.price) + " ";
    });

    return (
      <path className="linechart_path" d={pathD} style={{stroke: color}} />
    );
  }
  // // BUILD GRID AXIS
  makeAxis() {
  const minX = this.getMinX(), maxX = this.getMaxX();
  const minY = this.getMinY(), maxY = this.getMaxY();

  return (
    <g className="linechart_axis">
      <line
        x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
        x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)} />
      <line
        x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
        x2={this.getSvgX(minX)} y2={this.getSvgY(maxY)} />
    </g>
    );
  }
  // RENDER & RETURN SVG PATH AND AXIS
  render() {
    const {svgHeight, svgWidth} = this.props;
    return (
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {this.makePath()}
        {this.makeAxis()}
      </svg>
    );
  }
}
// DEFAULT PROPS
LineChart.defaultProps = {
  data: [{time: 1533927000000, price: 0.4859350692396629},
    {time: 1533960660000, price: 0.46109542117944335},
    {time: 1533994380000, price: 0.43124285729919},
    {time: 1534028160000, price: 0.4666524352888304},
    {time: 1534062000000, price: 0.6016713811143356},
    {time: 1534095900000, price: 0.7882975541072558},
    {time: 1534129860000, price: 0.9212243030494482},
    {time: 1534163880000, price: 0.8989598276075751},
    {time: 1534197960000, price: 0.7362473866462682},
    {time: 1534232100000, price: 0.581334406374345}],
  color: '#FFFFFF',
  svgHeight: 300,
  svgWidth: 400
}

export default LineChart;