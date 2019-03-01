import filterTemplate from './templates/filter-template';

const filtersContainer = document.querySelector(`.trip-filter`);

export const renderFilters = () => {
  filtersContainer.innerHTML = ``;
  filtersContainer.innerHTML = filterTemplate;
};
