import filterTemplate from './templates/filter-template';
import tripPointTemplate from './templates/trip-point-template';
import {dataTemplate} from './data/data';

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-day__items`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

export const renderTripPoints = () => {
  tripPointsContainer.innerHTML = ``;
  tripPointsContainer.innerHTML = tripPointTemplate(dataTemplate());
};
