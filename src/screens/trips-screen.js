import TripDayView from '../view/trip-day-view';
import TripPointView from '../view/trip-point-view';
import TripPointEditView from '../view/trip-point-edit-view';
import TripPointCreateView from '../view/trip-point-create-view';
import FilterView from '../view/filter-view';
import SortingView from '../view/sorting-view';
import {filterPoints, sortPoints} from '../utils';
import {fetchTripPoints, provider} from '../main';
import {calcTotalPrice} from '../utils';
import {DATA} from '../data/data';
import emitter from '../services/emitter';


const filtersContainer = document.querySelector(`.trip-filter`);
const sortingsContainer = document.querySelector(`.trip-sorting`);
const tripPointsContainer = document.querySelector(`.trip-points`);
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


export const renderTripDays = (data) => {
  tripPointsContainer.innerHTML = ``;

  data.forEach((item) => {
    const tripDay = new TripDayView(item.day);
    const dayElem = tripDay.render();

    const dayPointsContainer = dayElem.querySelector(`.trip-day__items`);

    renderTripPoints(item.points, dayPointsContainer);

    tripPointsContainer.appendChild(dayElem);
    calcTotalPrice(tripTotalCostContainer, DATA.POINTS);
  });
};


export const renderTripPoints = (points, container) => {
  container.innerHTML = ``;
  emitter.emit(`tripPointEditUnrender`);
  emitter.emit(`tripPointCreateUnrender`);

  points.forEach((point) => {
    const tripPoint = new TripPointView(point);
    const tripPointEdit = new TripPointEditView(point);

    container.appendChild(tripPoint.render());

    emitter.on(`tripPointCreateUnrender`, () => {
      if (tripPointCreate.element) {
        tripPointCreate.unrender();
      }
    });
    emitter.on(`tripPointEditUnrender`, () => {
      if (tripPointEdit.element) {
        tripPointEdit.unrender();
      }
    });
    emitter.on(`closeTripPointCreate`, () => {
      if (tripPointCreate.element) {
        tripPointCreate.unrender();
        tripPointCreate.clearForm();
      }
    });
    emitter.on(`closeTripPointEdit`, () => {
      if (tripPointEdit.element) {
        tripPoint.render();
        container.replaceChild(tripPoint.element, tripPointEdit.element);
        tripPointEdit.resetData();
        tripPointEdit.unrender();
      }
    });

    tripPoint.onClick = () => {
      emitter.emit(`closeTripPointEdit`);
      emitter.emit(`closeTripPointCreate`);
      tripPointEdit.render();
      container.replaceChild(tripPointEdit.element, tripPoint.element);
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
          container.replaceChild(tripPoint.element, tripPointEdit.element);
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
      container.replaceChild(tripPoint.element, tripPointEdit.element);
      tripPointEdit.resetData();
      tripPointEdit.unrender();
    };
  });
};


const tripPointCreate = new TripPointCreateView();

export const renderCreateTripPoint = () => {
  tripPointsContainer.insertBefore(tripPointCreate.render(), tripPointsContainer.firstChild);
};

tripPointCreate.onClose = () => {
  tripPointCreate.unrender();
  tripPointCreate.clearForm();
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

          const sortType = document.querySelector(`input[name=trip-sorting]:checked`);
          const sortedPoints = sortPoints(DATA.POINTS, sortType.value);
          renderTripPoints(sortedPoints);
        });
    });
};
