import ComponentView from './component';
import {DATA} from '../data/data';
import {moment} from '../utils';

export default class TripPointView extends ComponentView {

  constructor(data) {
    super();
    this._type = data.type;
    this._title = data.title;
    this._price = data.price;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._offers = [];

    this._onEdit = null;
    this._onPointClick = this._onPointClick.bind(this);
  }

  get duration() {
    const diff = this._dateTo - this._dateFrom;
    const hours = Math.floor(moment.duration(diff).asHours());
    const minutes = moment.utc(diff).format(`mm`);
    const time = `${hours}h ${minutes}m`;

    return time;
  }

  set onClick(fn) {
    this._onEdit = fn;
  }

  _onPointClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  update(data) {
    this._type = data.type;
    this._title = data.title;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._price = data.price;
    this._offers = data.activeOffers;
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
        <i class="trip-icon">${DATA.ICONS[this._type]}</i>
        <h3 class="trip-point__title">${this._type} to ${this._title}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">
            ${moment(this._dateFrom).format(`H:mm`)}&nbsp;&mdash; 
            ${moment(this._dateTo).format(`H:mm`)}
          </span>
          <span class="trip-point__duration">${this.duration}</span>
        </p>
        <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
        <ul class="trip-point__offers">
          ${this._offers.map((offer) => `
            <li>
              <button class="trip-point__offer">${offer}</button>
            </li>
          `).join(``)}
        </ul>
      </article>
    `.trim();
  }
}
