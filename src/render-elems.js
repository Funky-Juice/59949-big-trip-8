import filterTemplate from './templates/filter-template';
import tripPointTemplate from './templates/trip-point-template';

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-day__items`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

export const renderTripPoints = () => {
  const num = Math.floor(Math.random() * 7) + 1;

  tripPointsContainer.innerHTML = ``;
  tripPointsContainer.innerHTML = tripPointTemplate.repeat(num);
};
