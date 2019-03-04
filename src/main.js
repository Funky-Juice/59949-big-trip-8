import {renderFilters, renderTripPoints} from './render-elems';

renderFilters();
renderTripPoints();

const filters = document.querySelectorAll(`.trip-filter input`);

for (const filter of filters) {
  filter.onclick = (() => {
    const qty = Math.floor(Math.random() * 7) + 1;
    renderTripPoints(qty);
  });
}
