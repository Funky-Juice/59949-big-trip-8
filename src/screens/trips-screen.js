import TripPointView from '../view/trip-point-view';
import TripPointEditView from '../view/trip-point-edit-view';
import TripPointCreateView from '../view/trip-point-create-view';
import FilterView from '../view/filter-view';
import SortingView from '../view/sorting-view';
import {filterPoints, hideBlock, showBlock, sortPoints} from '../utils';
import {fetchTripPoints, provider} from '../main';
import {calcTotalPrice} from '../utils';
import {DATA, filtersList, sortingsList} from '../data/data';
import emitter from '../services/emitter';


const filtersContainer = document.querySelector(`.trip-filter`);
const sortingsContainer = document.querySelector(`.trip-sorting`);
const tripPointsContainer = document.querySelector(`.trip-day__items`);
const pointCreateContainer = document.querySelector(`.point-create-form-wrapper`);
const tripTotalCostContainer = document.querySelector(`.trip__total-cost`);


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
  emitter.emit(`tripPointEditUnrender`);
  calcTotalPrice(tripTotalCostContainer, DATA.POINTS);

  points.forEach((point) => {
    const tripPoint = new TripPointView(point);
    const tripPointEdit = new TripPointEditView(point);

    tripPointsContainer.appendChild(tripPoint.render());

    emitter.on(`tripPointEditUnrender`, () => {
      if (tripPointEdit.element) {
        tripPointEdit.unrender();
      }
    });

    emitter.on(`closeTripPointEdit`, () => {
      if (tripPointEdit.element) {
        tripPoint.render();
        tripPointsContainer.replaceChild(tripPoint.element, tripPointEdit.element);
        tripPointEdit.resetData();
        tripPointEdit.unrender();
      }
    });

    tripPoint.onClick = () => {
      emitter.emit(`closeTripPointEdit`);
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
          calcTotalPrice(tripTotalCostContainer, DATA.POINTS);
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
          calcTotalPrice(tripTotalCostContainer, DATA.POINTS);
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
      tripPointEdit.resetData();
      tripPointEdit.unrender();
    };
  });
};


const tripPointCreate = new TripPointCreateView();

export const renderCreateTripPoint = () => {
  pointCreateContainer.appendChild(tripPointCreate.render());
  showBlock(pointCreateContainer);
};

tripPointCreate.onClose = () => {
  tripPointCreate.unrender();
  hideBlock(pointCreateContainer);
};

tripPointCreate.onSubmit = (newObject) => {

  tripPointCreate.block();
  tripPointCreate.showBorder();

  const toRAW = (data) => {
    return {
      'type': data.type,
      'offers': data.offers,
      'base_price': data.price,
      'date_from': data.dateFrom,
      'date_to': data.dateTo,
      'is_favorite': data.isFavorite,
      'destination': {
        'name': data.title
      }
    };
  };

  provider.createTripPoint(toRAW(newObject))
    .then(() => {
      fetchTripPoints()
        .then((data) => (DATA.POINTS = data[0]))
        .then(() => {
          tripPointCreate.unblock();
          tripPointCreate.unrender();
          tripPointCreate.clearForm();
          hideBlock(pointCreateContainer);

          renderFilters(filtersList);
          renderSortings(sortingsList);
          renderTripPoints(DATA.POINTS);
        });
    });
};
