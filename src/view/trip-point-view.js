import {createElement} from '../utils';

export default class TripPointView {

  constructor(data) {
    this._icon = data.icon;
    this._type = data.type;
    this._title = data.title;
    this._offers = data.offers;
    this._price = data.price;
    this._time = data.time;

    this._element = null;
    this._onEdit = null;
    this._onPointClick = this._onPointClick.bind(this);
  }

  get element() {
    return this._element;
  }

  set onClick(fn) {
    this._onEdit = fn;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();

    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  _onPointClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  bind() {
    this._element.addEventListener(`click`, this._onPointClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onPointClick);
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${this._icon}</i>
        <h3 class="trip-point__title">${this._type} to ${this._title}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${this._time.start}&nbsp;&mdash; ${this._time.end}</span>
          <span class="trip-point__duration">${this._time.duration}</span>
        </p>
        <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
        <ul class="trip-point__offers">
          ${this._offers.map((offer) => `
            <li>
              <button class="trip-point__offer">${offer.name} +&euro;&nbsp;${offer.price}</button>
            </li>
          `).join(``)}
        </ul>
      </article>
    `.trim();
  }
}
