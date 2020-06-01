import {calculatePriceByEventType, calculateEventTypeOccurrence, calculateEventTimeSpend} from '../utils/event-helpers.js';
import AllMighty from './all-mighty.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const getStatisticsData = (tripEvents) => {
  const totalPrices = [calculatePriceByEventType(tripEvents, `flight`), calculatePriceByEventType(tripEvents, `check-in`),
    calculatePriceByEventType(tripEvents, `drive`), calculatePriceByEventType(tripEvents, `sightseeing`),
    calculatePriceByEventType(tripEvents, `transport`)];

  const totalNumberOfOccurrences = [calculateEventTypeOccurrence(tripEvents, `flight`), calculateEventTypeOccurrence(tripEvents, `drive`),
    calculateEventTypeOccurrence(tripEvents, `transport`)];

  const totalTimeSpend = [calculateEventTimeSpend(tripEvents, `flight`), calculateEventTimeSpend(tripEvents, `drive`),
    calculateEventTimeSpend(tripEvents, `restaurant`)];

  return {totalPrices, totalNumberOfOccurrences, totalTimeSpend};
};

const returnCharts = (data) => {
  let {totalPrices, totalNumberOfOccurrences, totalTimeSpend} = getStatisticsData(data);

  const moneyCtx = document.querySelector(`.statistics__chart--money`);
  const transportCtx = document.querySelector(`.statistics__chart--transport`);
  const timeSpendCtx = document.querySelector(`.statistics__chart--time`);

  const BAR_HEIGHT = 55;
  moneyCtx.height = BAR_HEIGHT * 6;
  transportCtx.height = BAR_HEIGHT * 4;
  timeSpendCtx.height = BAR_HEIGHT * 4;

  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`FLY`, `STAY`, `DRIVE`, `LOOK`, `RIDE`],
      datasets: [{
        data: totalPrices,
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
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
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

  const transportChart = new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`FLY`, `DRIVE`, `RIDE`],
      datasets: [{
        data: totalNumberOfOccurrences,
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
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
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

  const timeSpendChart = new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`FLY`, `DRIVE`, `DINE`],
      datasets: [{
        data: totalTimeSpend,
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
          formatter: (val) => `${val}h`
        }
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
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
  return {moneyChart, transportChart, timeSpendChart};
};

const updateStatisticsData = (charts, newData) => {
  let {moneyChart, transportChart, timeSpendChart} = charts;
  let {totalPrices, totalNumberOfOccurrences, totalTimeSpend} = getStatisticsData(newData);
  moneyChart.data.datasets[0].data = totalPrices;
  transportChart.data.datasets[0].data = totalNumberOfOccurrences;
  timeSpendChart.data.datasets[0].data = totalTimeSpend;
  moneyChart.update();
  transportChart.update();
  timeSpendChart.update();
};

const returnStatistics = () => {
  return (`<section class="statistics hidden">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`);
};

export default class Statistics extends AllMighty {
  constructor() {
    super();
    this._charts = null;
  }

  getTemplate() {
    return returnStatistics();
  }

  getCharts(tripEvents) {
    this._charts = returnCharts(tripEvents);
    return this._charts;
  }

  updateStatisticsData(tripEvents) {
    return updateStatisticsData(this._charts, tripEvents);
  }
}
