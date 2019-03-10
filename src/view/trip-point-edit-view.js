import {createElement} from '../utils';
import {DATA} from '../data/data';

export default class TripPointEditView {

  constructor(data) {
    this._icon = data.icon;
    this._type = data.type;
    this._title = data.title;
    this._pictures = data.pictures;
    this._offers = data.offers;
    this._description = data.description;
    this._price = data.price;
    this._time = data.time;

    this._element = null;
    this._onSubmit = null;
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  get element() {
    return this._element;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
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

  _onFormSubmit(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  bind() {
    this._element.querySelector(`.point form`).addEventListener(`submit`, this._onFormSubmit);
  }

  unbind() {
    this._element.querySelector(`.point form`).removeEventListener(`submit`, this._onFormSubmit);
  }

  get template() {
    return `
      <article class="point">
        <form action="" method="get">
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day">
            </label>
      
            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">${this._icon}️</label>
      
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
      
              <div class="travel-way__select">
                <div class="travel-way__select-group">
                  ${Object.keys(DATA.ICONS).map((key) => `
                    <input class="travel-way__select-input visually-hidden"
                      type="radio"
                      id="travel-way-${key}"
                      name="travel-way"
                      value="${key}"
                      ${DATA.ICONS[key] === this._icon ? `checked` : ``}
                    >
                    <label class="travel-way__select-label" for="travel-way-${key}">${DATA.ICONS[key]} ${key}</label>
                  `).join(``)}
                </div>
      
                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
                  <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>
      
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
                  <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
                </div>
              </div>
            </div>
      
            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${this._type} to</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._title}" name="destination">
              <datalist id="destination-select">
                ${DATA.PLACES.map((place) => `
                  <option value="${place}"></option>
                `)}
              </datalist>
            </div>
      
            <label class="point__time">
              choose time
              <input class="point__input" type="text" value="${this._time.start}&nbsp;&mdash; ${this._time.end}" name="time" placeholder="00:00 — 00:00">
            </label>
      
            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${this._price}" name="price">
            </label>
      
            <div class="point__buttons">
              <button class="point__button point__button--save" type="submit">Save</button>
              <button class="point__button" type="reset">Delete</button>
            </div>
      
            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
      
          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
      
              <div class="point__offers-wrap">
                ${this._offers.map((offer, i) => `
                  <input class="point__offers-input visually-hidden" type="checkbox" id="${offer.name}-${i}" name="offer" value="${offer.name}">
                  <label for="${offer.name}-${i}" class="point__offers-label">
                    <span class="point__offer-service">${offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
                  </label>
                `.trim()).join(``)}
              </div>      
            </section>

            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._description}</p>
              <div class="point__destination-images">
                ${this._pictures.map((picture) => `
                  <img src="${picture}" alt="picture from place" class="point__destination-image">
                `.trim()).join(``)}
              </div>
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>
    `.trim();
  }
}
