
const filtersList = [`everything`, `future`, `past`];

export default `\
    ${filtersList.map((name, i) => `\
      <input type="radio" id="filter-${name}" name="filter" value="${name}" ${i === 0 ? `checked` : ``}>
      <label class="trip-filter__item" for="filter-${name}">${name}</label>
    `).join(``)}`;
