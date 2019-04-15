import ComponentView from './component';

export default class TripDayView extends ComponentView {

  constructor(day) {
    super();
    this._number = day.number;
    this._date = day.date;
  }

  get template() {
    return `\
    <section class="trip-day">
      <article class="trip-day__info">
        <p class="trip-day__number">${this._number}</p>
        <h2 class="trip-day__title">${this._date}</h2>
      </article>
      <div class="trip-day__items"></div>
    </section>`.trim();
  }
}
