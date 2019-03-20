import filterTemplate from './templates/filter-template';
import TripPointView from './view/trip-point-view';
import TripPointEditView from './view/trip-point-edit-view';

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-day__items`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};

export const renderTripPoints = (points) => {
  tripPointsContainer.innerHTML = ``;

  points.forEach((point) => {
    const tripPoint = new TripPointView(point);
    const tripPointEdit = new TripPointEditView(point);

    tripPointsContainer.appendChild(tripPoint.render());

    tripPoint.onClick = () => {
      tripPointEdit.render();
      tripPointsContainer.replaceChild(tripPointEdit.element, tripPoint.element);
      tripPoint.unrender();
    };

    tripPointEdit.onSubmit = (newObject) => {
      point.icon = newObject.icon;
      point.type = newObject.type;
      point.title = newObject.title;
      point.time = newObject.time;
      point.price = newObject.price;
      point.isFavorite = newObject.isFavorite;
      point.isFavorite = newObject.isFavorite;
      point.activeOffers = newObject.offers;

      tripPoint.update(point);
      tripPoint.render();
      tripPointsContainer.replaceChild(tripPoint.element, tripPointEdit.element);
      tripPointEdit.unrender();
    };
  });
};
