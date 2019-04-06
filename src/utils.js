export const moment = require(`moment`);


export const createElement = (template) => {
  const elem = document.createElement(`div`);
  elem.innerHTML = template;

  return elem.firstChild;
};

export const filterPoints = (points, filterName) => {

  switch (filterName) {
    case `everything`:
      return points;

    case `future`:
      return points.filter((it) => it.time > Date.now());

    case `past`:
      return points.filter((it) => it.time < Date.now());

    default:
      return points;
  }
};

export const sortPoints = (points, sortingName) => {

  switch (sortingName) {
    case `event`:
      return points;

    case `time`:
      const newArr = Array.from(points);
      return newArr.sort((a, b) => b.duration - a.duration);

    case `price`:
      return Array.from(points).sort((a, b) => b.price - a.price);

    default:
      return points;
  }
};

const objEntriesToObj = (objEntries) => {
  const tempObj = {
    labels: [],
    data: []
  };

  objEntries.forEach((it) => {
    tempObj.labels.push(it[0]);
    tempObj.data.push(it[1]);
  });

  return tempObj;
};

export const objectToArray = (obj) => {
  return Object.keys(obj).map((id) => obj[id]);
};

const sortObjValues = (obj) => {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
};

const deleteEmptyObjProps = (obj) => {
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key];
    }
  }
};

export const chartsDataAdapter = (points, data) => {
  let moneyAmount = {};
  let transportAmount = {};

  if (!points) {
    return null;
  }

  Object.keys(data.ICONS).map((it) => {
    moneyAmount[it] = null;
    points.map((point) => {
      if (point.type === it) {
        moneyAmount[it] += parseInt(point.price, 10);
      }
    });
  });

  deleteEmptyObjProps(moneyAmount);
  const sortedMoney = sortObjValues(moneyAmount);
  moneyAmount = objEntriesToObj(sortedMoney);


  const tripTypesArr = points.map((task) => task.type);
  tripTypesArr.forEach((type) => {
    transportAmount[type] = (transportAmount[type] || 0) + 1;
  });

  const sortedTransport = sortObjValues(transportAmount);
  transportAmount = objEntriesToObj(sortedTransport);


  return {
    money: moneyAmount,
    transport: transportAmount
  };
};

export const showBlock = (container) => {
  container.classList.remove(`visually-hidden`);
};

export const hideBlock = (container) => {
  container.classList.add(`visually-hidden`);
};

export const showError = (container) => {
  container.classList.remove(`visually-hidden`);
  container.innerText = `
    Something went wrong while loading your route info.
    Check your connection or try again later.`;
};
