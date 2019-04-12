import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {DATA} from '../data/data';

const timeSpentCtx = document.querySelector(`.statistic__time-spend`).getContext(`2d`);

export default (points) => {
  if (!points) {
    return null;
  } else {
    const timeChart = new Chart(timeSpentCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: points.time.labels,
        datasets: [{
          data: points.time.data,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val} H`
          }
        },
        title: {
          display: true,
          text: `TIME SPENT`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
              callback: (value) => `${DATA.ICONS[value]} ${value.toUpperCase()}`
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });

    return timeChart;
  }
};
