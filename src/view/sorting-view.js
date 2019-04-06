import ComponentView from './component';

export default class SortingView extends ComponentView {

  constructor(data) {
    super();
    this._name = data.name;

    this._onSort = null;
    this._onSortClick = this._onSortClick.bind(this);
  }

  get name() {
    return this._name;
  }

  set onSort(fn) {
    this._onSort = fn;
  }

  _onSortClick() {
    return typeof this._onSort === `function` && this._onSort();
  }

  bind() {
    this._element.querySelector(`.trip-sorting__item`).addEventListener(`click`, this._onSortClick);
  }

  unbind() {
    this._element.querySelector(`.trip-sorting__item`).removeEventListener(`click`, this._onSortClick);
  }

  get template() {
    return `\
    <div style="display: inline-block">
      <input type="radio"
             name="trip-sorting"
             id="sorting-${this._name}"
             value="${this._name}"
             ${this._name === `event` && `checked`}
      >
      <label class="trip-sorting__item trip-sorting__item--${this._name}" for="sorting-${this._name}">${this._name}</label>
    </div>`.trim();
  }
}
