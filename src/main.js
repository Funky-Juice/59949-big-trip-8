import {renderFilters, renderTripPoints} from './render-elems';
import {dataTemplate} from './data/data';
import {generateData} from './utils';

const pointsData = generateData(dataTemplate);

renderFilters();
renderTripPoints(pointsData);

const filters = document.querySelectorAll(`.trip-filter input`);

for (const filter of filters) {
  filter.onclick = (() => {
    const pointsCount = Math.floor(Math.random() * 7) + 1;
    const data = generateData(dataTemplate, pointsCount);
    renderTripPoints(data);
  });
}
