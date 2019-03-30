import {renderCharts, destroyCharts} from './screens/stats-screen';
import {fetchTripPoints} from './main';
import {renderFilters, renderTripPoints} from './screens/trips-screen';
import {filtersList} from './data/data';

const pointsContainer = document.getElementById(`table`);
const statisticContainer = document.querySelector(`.statistic`);

const pointsBtn = document.getElementById(`table-nav-btn`);
const statsBtn = document.getElementById(`stats-nav-btn`);


statsBtn.addEventListener(`click`, () => {
  pointsContainer.classList.add(`visually-hidden`);
  statisticContainer.classList.remove(`visually-hidden`);

  pointsBtn.classList.remove(`view-switch__item--active`);
  statsBtn.classList.add(`view-switch__item--active`);

  destroyCharts();
  fetchTripPoints()
    .then((data) => {
      renderCharts(data);
    });
});

pointsBtn.addEventListener(`click`, () => {
  statisticContainer.classList.add(`visually-hidden`);
  pointsContainer.classList.remove(`visually-hidden`);

  pointsBtn.classList.add(`view-switch__item--active`);
  statsBtn.classList.remove(`view-switch__item--active`);

  fetchTripPoints()
    .then((data) => {
      renderFilters(filtersList, data);
      renderTripPoints(data);
    });
});
