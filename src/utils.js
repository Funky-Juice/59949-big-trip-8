
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
