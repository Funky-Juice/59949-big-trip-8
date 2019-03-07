import filterTemplate from './templates/filter-template';
import {dataTemplate} from './data/data';
import TripPointView from './view/trip-point-view';
import TripPointEditView from './view/trip-point-edit-view';

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-day__items`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

export const renderTripPoints = () => {
  const pointData = dataTemplate();
  tripPointsContainer.innerHTML = ``;

  const tripPoint = new TripPointView(pointData);
  const tripPointEdit = new TripPointEditView(pointData);

  tripPointsContainer.appendChild(tripPoint.render());

  tripPoint.onClick = () => {
    tripPointEdit.render();
    tripPointsContainer.replaceChild(tripPointEdit.element, tripPoint.element);
    tripPoint.unrender();
  };

  tripPointEdit.onSubmit = () => {
    tripPoint.render();
    tripPointsContainer.replaceChild(tripPoint.element, tripPointEdit.element);
    tripPointEdit.unrender();
  };
};
