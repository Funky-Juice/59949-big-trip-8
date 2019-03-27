import TripPointView from '../view/trip-point-view';
import TripPointEditView from '../view/trip-point-edit-view';
import FilterView from '../view/filter-view';
import {filterPoints} from '../utils';
import {api, fetchTripPoints} from '../main';


const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointsContainer = document.querySelector(`.trip-day__items`);

export const renderFilters = (filters, points) => {
  filtersContainer.innerHTML = ``;

  filters.forEach((filter) => {
    const filterComponent = new FilterView(filter);
    filtersContainer.appendChild(filterComponent.render());

    filterComponent.onFilter = () => {
      const filteredPoints = filterPoints(points, filterComponent.name);
      renderTripPoints(filteredPoints);
    };
  });
};

export const renderTripPoints = (points) => {
  tripPointsContainer.innerHTML = ``;

  points.forEach((point) => {
    if (point.isDeleted) {
      return;
    }
    const tripPoint = new TripPointView(point);
    const tripPointEdit = new TripPointEditView(point);

    tripPointsContainer.appendChild(tripPoint.render());

    tripPoint.onClick = () => {
      tripPointEdit.render();
      tripPointsContainer.replaceChild(tripPointEdit.element, tripPoint.element);
      tripPoint.unrender();
    };

    tripPointEdit.onSubmit = (newObject) => {
      point.type = newObject.type;
      point.title = newObject.title;
      point.dateFrom = newObject.dateFrom;
      point.dateTo = newObject.dateTo;
      point.price = newObject.price;
      point.isFavorite = newObject.isFavorite;
      point.offers = newObject.offers;
      point.activeOffers = newObject.activeOffers;

      tripPoint.update(point);
      tripPoint.render();
      tripPointsContainer.replaceChild(tripPoint.element, tripPointEdit.element);
      tripPointEdit.unrender();
      // api.updateTripPoint({id: point.id, data: point.toRAW()})
      //   .then((newPoint) => {
      //     tripPoint.update(newPoint);
      //     tripPoint.render();
      //     tripPointsContainer.replaceChild(tripPoint.element, tripPointEdit.element);
      //     tripPointEdit.unrender();
      //   });
    };

    tripPointEdit.onDelete = (id) => {
      api.deleteTripPoint(id)
        .then(() => fetchTripPoints());
    };
  });
};
