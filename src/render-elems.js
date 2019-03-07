import filterTemplate from './templates/filter-template';
import {dataTemplate} from './data/data';
import TripPointView from "./view/trip-point-view";

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-day__items`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

export const renderTripPoints = () => {
  tripPointsContainer.innerHTML = ``;

  const tripPoint = new TripPointView(dataTemplate());
  tripPoint.render(tripPointsContainer);
};
