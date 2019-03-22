export const moment = require(`moment`);

export const getRandomValFromArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomLengthArr = (arr, qty) => {
  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    newArr.push(getRandomValFromArr(arr));
  }
  const maxQty = Math.floor(Math.random() * qty);

  return [...new Set(newArr)].slice(0, maxQty);
};

export const getObjectsArray = (arr, qty) => {
  const tempArr = getRandomLengthArr(arr, qty);
  const newArr = [];

  for (let i = 0; i < tempArr.length; i++) {
    newArr.push({
      id: `offer-${i}`,
      name: tempArr[i],
      price: getRandomInt(10, 201),
      isActive: false
    });
  }
  return newArr;
};

export const getRandomString = (str, qty) => {
  const sentenceArr = str.split(`. `);
  const newArr = [];
  const stringsQty = Math.floor(Math.random() * qty) + 1;

  for (let i = 0; i < stringsQty; i++) {
    newArr.push(sentenceArr[Math.floor(Math.random() * sentenceArr.length)]);
  }
  return newArr.join(`. `);
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getPicturesArr = (min, max) => {
  const picturesSet = new Set();

  for (let i = 0; i < getRandomInt(min, max); i++) {
    picturesSet.add(`http://picsum.photos/300/150?r=${Math.random()}`);
  }
  return [...picturesSet];
};

export const getRandomTime = () => {
  let startTime = null;
  let endTime = null;

  const oneDay = 24 * 60 * 60 * 1000;
  const timeA = new Date(getRandomInt(Date.now(), Date.now() + oneDay));
  const timeB = new Date(getRandomInt(Date.now(), Date.now() + oneDay));

  if (timeA < timeB) {
    startTime = timeA;
    endTime = timeB;
  } else {
    startTime = timeB;
    endTime = timeA;
  }

  return {
    start: startTime.toLocaleTimeString(`ru`, {hour: `2-digit`, minute: `2-digit`}),
    end: endTime.toLocaleTimeString(`ru`, {hour: `2-digit`, minute: `2-digit`})
  };
};

export const generateData = (template, objectsQty = 7) => {
  const dataList = [];

  for (let i = 0; i < objectsQty; i++) {
    dataList.push(template());
  }
  return dataList;
};

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

export const chartsDataAdapter = (points, data) => {
  let moneyAmount = {};

  const filteredPoints = points.filter((point) => !point.isDeleted);
  if (!filteredPoints.length) {
    return null;
  }

  data.TYPE.map((it) => {
    moneyAmount[it] = null;

    filteredPoints.map((point) => {
      if (point.type === it) {
        moneyAmount[it] += parseInt(point.price, 10);
      }
    });
  });

  for (const key in moneyAmount) {
    if (!moneyAmount[key]) {
      delete moneyAmount[key];
    }
  }

  const sortedMoney = Object.entries(moneyAmount).sort((a, b) => b[1] - a[1]);

  moneyAmount = {
    labels: [],
    data: []
  };

  sortedMoney.forEach((it) => {
    moneyAmount.labels.push(it[0]);
    moneyAmount.data.push(it[1]);
  });

  return {
    money: moneyAmount
  };
};
