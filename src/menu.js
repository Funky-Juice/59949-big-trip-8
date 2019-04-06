import {renderCharts, destroyCharts} from './screens/stats-screen';
import {renderFilters, renderSortings, renderTripPoints} from './screens/trips-screen';
import {fetchTripPoints} from './main';
import {filtersList, sortingsList} from './data/data';
import {showBlock, hideBlock} from './utils';


const pointsContainer = document.getElementById(`table`);
const statisticContainer = document.querySelector(`.statistic`);
const messageContainer = document.querySelector(`.message-container`);

const pointsBtn = document.getElementById(`table-nav-btn`);
const statsBtn = document.getElementById(`stats-nav-btn`);


statsBtn.addEventListener(`click`, () => {
  hideBlock(pointsContainer);
  hideBlock(messageContainer);

  pointsBtn.classList.remove(`view-switch__item--active`);
  statsBtn.classList.add(`view-switch__item--active`);

  destroyCharts();
  fetchTripPoints()
    .then((data) => {
      showBlock(statisticContainer);
      renderCharts(data[0]);
    });
});


pointsBtn.addEventListener(`click`, () => {
  hideBlock(statisticContainer);
  hideBlock(messageContainer);

  pointsBtn.classList.add(`view-switch__item--active`);
  statsBtn.classList.remove(`view-switch__item--active`);

  fetchTripPoints()
    .then((data) => {
      showBlock(pointsContainer);
      renderFilters(filtersList, data[0]);
      renderSortings(sortingsList, data[0]);
      renderTripPoints(data[0]);
    });
});
