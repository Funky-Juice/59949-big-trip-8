import moneyChart from '../charts/money-chart';
import transportChart from '../charts/transport-chart';


let moneyChartLink;
let transportChartLink;

export const renderCharts = () => {
  moneyChartLink = moneyChart();
  transportChartLink = transportChart();
};

export const destroyCharts = () => {
  if (moneyChartLink) {
    moneyChartLink.destroy();
  }
  if (transportChartLink) {
    transportChartLink.destroy();
  }
};
