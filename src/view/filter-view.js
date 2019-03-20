import ComponentView from './component';

export default class FilterView extends ComponentView {

  constructor(data) {
    super();
    this._name = data.name;

    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get name() {
    return this._name;
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick() {
    return typeof this._onFilter === `function` && this._onFilter();
  }

  bind() {
    this._element.querySelector(`.trip-filter__item`).addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.querySelector(`.trip-filter__item`).removeEventListener(`click`, this._onFilterClick);
  }

  get template() {
    return `\
    <div style="display: inline-block">
      <input type="radio"
             name="filter"
             id="filter-${this._name}"
             value="${this._name}"
             ${this._name === `everything` && `checked`}
      >
      <label class="trip-filter__item" for="filter-${this._name}">${this._name}</label>
    </div>`.trim();
  }
}
