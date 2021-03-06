import React, { Component } from 'react';
import './App.css';
import { Line, defaults } from 'react-chartjs-2';

defaults.global.maintainAspectRatio = false

class LineChart extends Component {
  render() {
    const data = {
      labels: this.props.data.time,
      options: {
        legend: {
            display: false
        }
      },
      datasets: [
        {
          label: 'Stock',
          data: this.props.data.price,
          fill: false,          // Don't fill area under the line
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        }
      ],
    }
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            enabled: true
        },
        scales: {
            xAxes: [
            {
                ticks: {
                autoSkip: true,
                maxTicksLimit: 10
                }
            }
            ],
            yAxes: [
                {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 5
                    }
                }
            ]
        }
    }

    return (
        <article className="canvas-container">
          <Line data={data} options={options}/>
        </article>
    );
  }
}

export default LineChart;