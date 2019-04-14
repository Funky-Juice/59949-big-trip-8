import {renderCharts, destroyCharts} from './screens/stats-screen';
import {renderFilters, renderSortings, renderTripPoints, renderCreateTripPoint} from './screens/trips-screen';
import {fetchTripPoints} from './main';
import {DATA, filtersList, sortingsList} from './data/data';
import {showBlock, hideBlock} from './utils';
import emitter from './services/emitter';

const pointsContainer = document.getElementById(`table`);
const statisticContainer = document.querySelector(`.statistic`);
const messageContainer = document.querySelector(`.message-container`);

const pointsBtn = document.getElementById(`table-nav-btn`);
const statsBtn = document.getElementById(`stats-nav-btn`);
const newEventBtn = document.querySelector(`.trip-controls__new-event`);


statsBtn.addEventListener(`click`, () => {
  hideBlock(pointsContainer);
  hideBlock(messageContainer);

  pointsBtn.classList.remove(`view-switch__item--active`);
  statsBtn.classList.add(`view-switch__item--active`);

  destroyCharts();
  fetchTripPoints()
    .then((data) => (DATA.POINTS = data[0]))
    .then(() => {
      showBlock(statisticContainer);
      renderCharts(DATA.POINTS);
    });
});


pointsBtn.addEventListener(`click`, () => {
  hideBlock(statisticContainer);
  hideBlock(messageContainer);

  pointsBtn.classList.add(`view-switch__item--active`);
  statsBtn.classList.remove(`view-switch__item--active`);

  fetchTripPoints()
    .then((data) => (DATA.POINTS = data[0]))
    .then(() => {
      showBlock(pointsContainer);
      renderFilters(filtersList);
      renderSortings(sortingsList);
      renderTripPoints(DATA.POINTS);
    });
});


newEventBtn.addEventListener(`click`, () => {
  emitter.emit(`closeTripPointEdit`);
  renderCreateTripPoint();
  newEventBtn.disabled = true;
});

emitter.on(`unbindTripPointCreate`, () => {
  newEventBtn.disabled = false;
});
