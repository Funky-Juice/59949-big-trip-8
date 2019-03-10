
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
      name: tempArr[i],
      price: getRandomInt(10, 201)
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

  const diff = endTime.getTime() - startTime.getTime();
  const date = new Date(diff);
  const duration = `${date.getHours() + (new Date().getTimezoneOffset() / 60)}h ${date.getMinutes()}m`;

  return {
    start: startTime.toLocaleTimeString(`ru`, {hour: `2-digit`, minute: `2-digit`}),
    end: endTime.toLocaleTimeString(`ru`, {hour: `2-digit`, minute: `2-digit`}),
    duration
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
