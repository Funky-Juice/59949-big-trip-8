import moneyChart from '../charts/money-chart';
import transportChart from '../charts/transport-chart';
import {chartsDataAdapter} from '../utils';
import {DATA} from '../data/data';


let moneyChartLink;
let transportChartLink;

export const renderCharts = (data) => {
  const chartsData = chartsDataAdapter(data, DATA);

  moneyChartLink = moneyChart(chartsData);
  transportChartLink = transportChart(chartsData);
};

export const destroyCharts = () => {
  if (moneyChartLink) {
    moneyChartLink.destroy();
  }
  if (transportChartLink) {
    transportChartLink.destroy();
  }
};
