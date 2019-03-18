import ComponentView from './component';

export default class TripPointView extends ComponentView {

  constructor(data) {
    super();
    this._icon = data.icon;
    this._type = data.type;
    this._title = data.title;
    this._price = data.price;
    this._time = data.time;
    this._offers = [];

    this._onEdit = null;
    this._onPointClick = this._onPointClick.bind(this);
  }

  get duration() {
    const date = new Date();
    const startParams = this._time.start.split(`:`);
    const endParams = this._time.end.split(`:`);

    date.setHours(startParams[0]);
    date.setMinutes(startParams[1]);
    const startTimeStamp = date.getTime();

    date.setHours(endParams[0]);
    date.setMinutes(endParams[1]);
    let endTimeStamp = date.getTime();

    if (this._time.start > this._time.end) {
      endTimeStamp += 24 * 60 * 60 * 1000;
    }

    const diff = new Date(endTimeStamp - startTimeStamp);
    const duration = `${diff.getHours() + (new Date().getTimezoneOffset() / 60)}h ${diff.getMinutes()}m`;

    return duration;
  }

  set onClick(fn) {
    this._onEdit = fn;
  }

  _onPointClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  update(data) {
    this._icon = data.icon;
    this._type = data.type;
    this._title = data.title;
    this._time = data.time;
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
        <i class="trip-icon">${this._icon}</i>
        <h3 class="trip-point__title">${this._type} to ${this._title}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${this._time.start}&nbsp;&mdash; ${this._time.end}</span>
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
