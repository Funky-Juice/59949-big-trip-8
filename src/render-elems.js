import filterTemplate from './templates/filter-template';
import tripPointTemplate from './templates/trip-point-template';
import {generateData} from './utils';
import {dataTemplate} from './data/data';

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-day__items`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

export const renderTripPoints = (tasksQty) => {
  const tasksData = generateData(dataTemplate, tasksQty);

  tripPointsContainer.innerHTML = ``;
  tripPointsContainer.innerHTML = tripPointTemplate(tasksData);
};
