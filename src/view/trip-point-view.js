import {createElement} from '../utils';

export default class TripPointView {

  constructor(data) {
    this._icon = data.icon;
    this._type = data.type;
    this._title = data.title;
    this._picture = data.picture;
    this._offers = data.offers;
    this._description = data.description;
    this._price = data.price;

    this._element = null;
  }

  render(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }
    this._element = createElement(this.template);
    container.appendChild(this._element);

    this.bind();
  }

  bind() {
    //
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${this._icon}</i>
        <h3 class="trip-point__title">${this._type} to ${this._title}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
          <span class="trip-point__duration">1h 30m</span>
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
