import TripPointView from '../view/trip-point-view';
import TripPointEditView from '../view/trip-point-edit-view';
import FilterView from '../view/filter-view';
import SortingView from '../view/sorting-view';
import {filterPoints, sortPoints} from '../utils';
import {provider} from '../main';
import {DATA} from '../data/data';


const filtersContainer = document.querySelector(`.trip-filter`);
const sortingsContainer = document.querySelector(`.trip-sorting`);
const tripPointsContainer = document.querySelector(`.trip-day__items`);

export const renderFilters = (filters) => {
  filtersContainer.innerHTML = ``;

  filters.forEach((filter) => {
    const filterComponent = new FilterView(filter);
    filtersContainer.appendChild(filterComponent.render());

    filterComponent.onFilter = () => {
      const filteredPoints = filterPoints(DATA.POINTS, filterComponent.name);
      renderTripPoints(filteredPoints);
    };
  });
};

export const renderSortings = (sortings) => {
  sortingsContainer.innerHTML = ``;

  sortings.forEach((sorting) => {
    const sortingComponent = new SortingView(sorting);
    sortingsContainer.appendChild(sortingComponent.render());

    sortingComponent.onSort = () => {
      const sortedPoints = sortPoints(DATA.POINTS, sortingComponent.name);
      renderTripPoints(sortedPoints);
    };
  });
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
      point.type = newObject.type;
      point.title = newObject.title;
      point.dateFrom = newObject.dateFrom;
      point.dateTo = newObject.dateTo;
      point.duration = newObject.duration;
      point.price = newObject.price;
      point.isFavorite = newObject.isFavorite;
      point.offers = newObject.offers;
      point.activeOffers = newObject.activeOffers;

      tripPointEdit.block(`save`);
      tripPointEdit.showBorder();

      provider.updateTripPoint({id: point.id, data: point.toRAW()})
        .then((newPoint) => {
          tripPointEdit.unblock();
          tripPoint.update(newPoint);
          tripPoint.render();
          tripPointsContainer.replaceChild(tripPoint.element, tripPointEdit.element);
          tripPointEdit.unrender();
        })
        .catch(() => {
          tripPointEdit.shake();
          tripPointEdit.unblock();
          tripPointEdit.showBorder(true);
        });
    };

    tripPointEdit.onDelete = (id) => {
      tripPointEdit.block();
      tripPointEdit.showBorder();

      provider.deleteTripPoint(id)
        .then(() => {
          DATA.POINTS = DATA.POINTS.filter((obj) => obj.id !== id.id);
          tripPointEdit.unrender();
        })
        .catch(() => {
          tripPointEdit.shake();
          tripPointEdit.unblock();
          tripPointEdit.showBorder(true);
        });
    };

    tripPointEdit.onClose = () => {
      tripPoint.render();
      tripPointsContainer.replaceChild(tripPoint.element, tripPointEdit.element);
      tripPointEdit.unrender();
    };
  });
};
