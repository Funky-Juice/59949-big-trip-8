import {getRandomValFromArr, getObjectsArray, getRandomString, getRandomInt} from '../utils';

export const DATA = {
  TYPE: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  TITLE: [`Moscow`, `Saint-Petersburg`, `Amsterdam `, `Barcelona`, `Berlin`, `Mumbai`, `Tokyo`, `Los-Angeles`],
  OFFERS: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`],
  DESCRIPTION: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ICONS: {
    [`Taxi`]: `🚕`,
    [`Bus`]: `🚌`,
    [`Train`]: `🚂`,
    [`Ship`]: `🛳️`,
    [`Transport`]: `🚊`,
    [`Drive`]: `🚗`,
    [`Flight`]: `✈️`
    // [`Check-in`]: `🏨`,
    // [`Sightseeing`]: `🏛️`,
    // [`Restaurant`]: `🍴`
  }
};

export const dataTemplate = () => {
  const tripType = getRandomValFromArr(DATA.TYPE);

  return {
    icon: DATA.ICONS[tripType],
    type: tripType,
    title: getRandomValFromArr(DATA.TITLE),
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    offers: getObjectsArray(DATA.OFFERS, 3),
    description: getRandomString(DATA.DESCRIPTION, 3),
    price: getRandomInt(10, 201)
  };
};