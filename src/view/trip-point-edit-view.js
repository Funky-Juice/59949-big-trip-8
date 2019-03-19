import ComponentView from './component';
import {DATA} from '../data/data';
// eslint-disable-next-line
import flatpickr from 'flatpickr';

export default class TripPointEditView extends ComponentView {

  constructor(data) {
    super();
    this._icon = data.icon;
    this._type = data.type;
    this._title = data.title;
    this._pictures = data.pictures;
    this._offers = data.offers;
    this._description = data.description;
    this._price = data.price;
    this._time = data.time;
    this._isFavorite = data.isFavorite;

    this._onSubmit = null;
    this._onFormSubmit = this._onFormSubmit.bind(this);

    this._onSetOffer = this._onSetOffer.bind(this);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  static createMapper(target) {
    return {
      [`travel-way`]: (value) => {
        target.type = value;
        target.icon = DATA.ICONS[value];
      },
      destination: (value) => {
        target.title = value;
      },
      time: (value) => {
        const timeParams = value.split(` — `);
        target.time.start = timeParams[0];
        target.time.end = timeParams[1];
      },
      price: (value) => {
        target.price = value;
      },
      favorite: (value) => {
        target.isFavorite = value;
      },
      offer: (value) => {
        target.offers.push(value);
      }
    };
  }

  _processForm(formData) {
    const entry = {
      type: ``,
      title: ``,
      time: {
        start: ``,
        end: ``
      },
      price: ``,
      isFavorite: false,
      offers: []
    };

    const taskEditMapper = TripPointEditView.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  update(data) {
    this._icon = data.icon;
    this._type = data.type;
    this._title = data.title;
    this._time = data.time;
    this._price = data.price;
    this._isFavorite = data.isFavorite;
  }

  _onSetOffer(evt) {
    if (evt.target.tagName.toLowerCase() === `input`) {

      this._offers.forEach((it) => {
        if (it.id === evt.target.id) {
          it.isActive = !it.isActive;
        }
      });
    }
  }

  bind() {
    this._element.querySelector(`.point form`).addEventListener(`submit`, this._onFormSubmit);
    this._element.querySelector(`.point__offers-wrap`).addEventListener(`click`, this._onSetOffer);

    this._element.querySelector(`.point__time .point__input`).flatpickr({
      locale: {
        rangeSeparator: ` — `
      },
      mode: `range`,
      enableTime: true,
      dateFormat: `H:i`,
      defaultDate: this._time
    });
  }

  unbind() {
    this._element.querySelector(`.point form`).removeEventListener(`submit`, this._onFormSubmit);
    this._element.querySelector(`.point__offers-wrap`).removeEventListener(`click`, this._onSetOffer);
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
              <input class="point__input"
                     type="text"
                     name="time"
                     placeholder="00:00 — 00:00"
                     value="${this._time.start} — ${this._time.end}"
              >
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
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite && `checked`}>
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
      
          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>
      
              <div class="point__offers-wrap">
                ${this._offers.map((offer) => `
                  <input class="point__offers-input visually-hidden"
                         type="checkbox"
                         name="offer"
                         id="${offer.id}"
                         value="${offer.name} + €${offer.price}"
                         ${offer.isActive && `checked`}
                  >
                  <label for="${offer.id}" class="point__offers-label">
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
