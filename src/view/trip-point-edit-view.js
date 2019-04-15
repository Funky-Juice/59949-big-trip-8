import ComponentView from './component';
import {DATA} from '../data/data';
import flatpickr from 'flatpickr';

export default class TripPointEditView extends ComponentView {

  constructor(data) {
    super();
    this._data = JSON.parse(JSON.stringify(data));
    this._id = data.id;
    this._type = data.type;
    this._title = data.title;
    this._pictures = this._getPlace(data.title).pictures;
    this._description = this._getPlace(data.title).description;
    this._offers = JSON.parse(JSON.stringify(data.offers));
    this._price = data.price;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._isFavorite = data.isFavorite;

    this._calendarDateStart = null;
    this._calendarDateEnd = null;

    this._onSubmit = null;
    this._onFormSubmit = this._onFormSubmit.bind(this);

    this._onSetOffer = this._onSetOffer.bind(this);

    this._onDelete = null;
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);

    this._onTypeChange = this._onTypeChange.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
    this._onPriceChange = this._onPriceChange.bind(this);

    this._onClose = null;
    this._onKeyPress = this._onKeyPress.bind(this);

    this._saveBtn = null;
    this._deleteBtn = null;
    this._pointWrapper = null;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  _getPlace(name) {
    const place = DATA.PLACES.find((obj) => obj.name === name);
    return place;
  }

  static createMapper(target) {
    return {
      [`travel-way`]: (value) => {
        target.type = value;
      },
      destination: (value) => {
        target.title = value;
      },
      [`date-start`]: (value) => {
        target.dateFrom = value * 1000;
      },
      [`date-end`]: (value) => {
        target.dateTo = value * 1000;
      },
      price: (value) => {
        target.price = parseInt(value, 10);
      },
      favorite: (value) => {
        target.isFavorite = value ? true : false;
      },
      offer: (value) => {
        target.activeOffers.push(value);
      }
    };
  }

  _processForm(formData) {
    const entry = {
      type: ``,
      title: ``,
      dateFrom: ``,
      dateTo: ``,
      price: 0,
      isFavorite: false,
      activeOffers: [],
      offers: this._offers
    };

    const pointEditMapper = TripPointEditView.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (pointEditMapper[property]) {
        pointEditMapper[property](value);
      }
    }
    entry.duration = entry.dateTo - entry.dateFrom;

    return entry;
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this._update(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();

    if (typeof this._onDelete === `function`) {
      this._onDelete({id: this._id});
    }
  }

  _onKeyPress(evt) {
    if (evt.key === `Escape` && typeof this._onClose === `function`) {
      this._onClose();
    }
  }

  _onTypeChange(evt) {

    this._offers.forEach((offer) => {
      if (offer.accepted) {
        this._price -= offer.price;
      }
    });

    const offers = DATA.OFFERS.find((obj) => obj.type === evt.target.value);

    if (offers) {
      offers.offers.forEach((obj) => {
        if (obj.name) {
          obj.title = obj.name;
          obj.accepted = false;
          delete obj.name;
        }
      });
      this._offers = JSON.parse(JSON.stringify(offers.offers));
    } else {
      this._offers = [];
    }

    this._type = evt.target.value;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onDestinationChange(evt) {
    const place = DATA.PLACES.find((obj) => obj.name === evt.target.value);

    if (!place) {
      return;
    }
    this._title = place.name;
    this._pictures = place.pictures;
    this._description = place.description;

    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onPriceChange(evt) {
    const priceInt = parseInt(evt.target.value, 10);

    if (priceInt === this._price) {
      return;
    }

    this._price = priceInt;

    this._offers.forEach((offer) => {
      offer.accepted = false;
    });

    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onFavoriteChange(evt) {
    this._isFavorite = evt.target.checked;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _update(data) {
    this._data = JSON.parse(JSON.stringify(data));
    this._type = data.type;
    this._title = data.title;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._price = data.price;
    this._isFavorite = data.isFavorite;
  }

  resetData(data = JSON.parse(JSON.stringify(this._data))) {
    this._type = data.type;
    this._title = data.title;
    this._pictures = this._getPlace(data.title).pictures;
    this._description = this._getPlace(data.title).description;
    this._offers = data.offers;
    this._price = data.price;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._isFavorite = data.isFavorite;
  }

  _onSetOffer(evt) {
    if (evt.target.tagName.toLowerCase() === `input`) {

      this._offers.forEach((offer) => {
        if (offer.title === evt.target.attributes.label.value) {
          offer.accepted = !offer.accepted;

          if (offer.accepted) {
            this._price += offer.price;
          } else {
            this._price -= offer.price;
          }

          this.unbind();
          this._partialUpdate();
          this.bind();
        }
      });
    }
  }

  bind() {
    this._element.querySelector(`.point form`).addEventListener(`submit`, this._onFormSubmit);
    this._element.querySelector(`.point__offers-wrap`).addEventListener(`click`, this._onSetOffer);
    this._element.querySelector(`.point__button--delete`).addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`input[name=destination]`).addEventListener(`change`, this._onDestinationChange);
    this._element.querySelector(`input[name=favorite]`).addEventListener(`change`, this._onFavoriteChange);
    this._element.querySelector(`input[name=price]`).addEventListener(`blur`, this._onPriceChange);

    document.body.addEventListener(`keyup`, this._onKeyPress);

    const inputs = this._element.querySelectorAll(`input[name=travel-way]`);
    inputs.forEach((it) => {
      it.addEventListener(`change`, this._onTypeChange);
    });

    this._calendarDateStart = flatpickr(this._element.querySelector(`.point__time [name='date-start']`), {
      enableTime: true,
      altInput: true,
      altFormat: `H:i`,
      dateFormat: `U`,
      [`time_24hr`]: true,
      defaultDate: this._dateFrom,
      onClose: (selectedDates, dateStr) => {
        this._calendarDateEnd.set(`minDate`, selectedDates[0]);
        this._dateFrom = dateStr;
      }
    });

    this._calendarDateEnd = flatpickr(this._element.querySelector(`.point__time [name='date-end']`), {
      enableTime: true,
      altInput: true,
      altFormat: `H:i`,
      dateFormat: `U`,
      [`time_24hr`]: true,
      defaultDate: this._dateTo,
      onClose: (selectedDates, dateStr) => {
        this._calendarDateStart.set(`maxDate`, selectedDates[0]);
        this._dateTo = dateStr;
      }
    });

    this._saveBtn = this._element.querySelector(`.point__button--save`);
    this._deleteBtn = this._element.querySelector(`.point__button--delete`);
    this._pointWrapper = this._element.querySelector(`article.point`);
  }

  unbind() {
    this._element.querySelector(`.point form`).removeEventListener(`submit`, this._onFormSubmit);
    this._element.querySelector(`.point__offers-wrap`).removeEventListener(`click`, this._onSetOffer);
    this._element.querySelector(`.point__button--delete`).removeEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelector(`input[name=destination]`).removeEventListener(`change`, this._onDestinationChange);
    this._element.querySelector(`input[name=favorite]`).addEventListener(`change`, this._onFavoriteChange);
    this._element.querySelector(`input[name=price]`).removeEventListener(`blur`, this._onPriceChange);

    document.body.removeEventListener(`keyup`, this._onKeyPress);

    const inputs = this._element.querySelectorAll(`input[name=travel-way]`);
    inputs.forEach((it) => {
      it.removeEventListener(`change`, this._onTypeChange);
    });

    this._calendarDateStart.destroy();
    this._calendarDateEnd.destroy();
  }

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  block(method) {
    this._saveBtn.disabled = true;
    this._deleteBtn.disabled = true;

    if (method === `save`) {
      this._saveBtn.innerText = `Saving...`;
    } else {
      this._deleteBtn.innerText = `Deleting...`;
    }
  }

  unblock() {
    this._saveBtn.disabled = false;
    this._deleteBtn.disabled = false;

    this._saveBtn.innerText = `Save`;
    this._deleteBtn.innerText = `Delete`;
  }

  showBorder(isShown) {
    this._pointWrapper.style.border = isShown ? `1px solid red` : `none`;
  }

  get template() {
    return `
      <div>
      <article class="point">
        <form action="" method="get">
          <header class="point__header">      
            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">${DATA.ICONS[this._type]}</label>
      
              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
      
              <div class="travel-way__select">
                <div class="travel-way__select-group">
                  ${Object.keys(DATA.ICONS).map((key) => `
                    <input class="travel-way__select-input visually-hidden"
                      type="radio"
                      id="travel-way-${key}"
                      name="travel-way"
                      value="${key}"
                      ${key === this._type ? `checked` : ``}
                    >
                    <label class="travel-way__select-label" for="travel-way-${key}">${DATA.ICONS[key]} ${key}</label>
                  `).join(``)}
                </div>
              </div>
            </div>
      
            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${this._type} to</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._title}" name="destination" required>
              <datalist id="destination-select">
                ${DATA.PLACES.map((place) => `
                  <option value="${place.name}"></option>
                `)}
              </datalist>
            </div>
            
            <div class="point__time">
              choose time
              <input class="point__input" type="text" value="${this._dateFrom}" name="date-start" placeholder="19:00">
              <input class="point__input" type="text" value="${this._dateTo}" name="date-end" placeholder="21:00">
            </div>
      
            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="number" value="${this._price}" name="price" required>
            </label>
      
            <div class="point__buttons">
              <button class="point__button point__button--save" type="submit">Save</button>
              <button class="point__button point__button--delete" type="reset">Delete</button>
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
                ${this._offers.map((offer, i) => `
                  <input class="point__offers-input visually-hidden"
                         type="checkbox"
                         name="offer"
                         id="offer-${i}"
                         label="${offer.title}"
                         value="${offer.title} + €${offer.price}"
                         ${offer.accepted && `checked`}
                  >
                  <label for="offer-${i}" class="point__offers-label">
                    <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
                  </label>
                `.trim()).join(``)}
              </div>      
            </section>

            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._description}</p>
              <div class="point__destination-images">
                ${this._pictures.map((picture) => `
                  <img src="${picture.src}" alt="${picture.description}" class="point__destination-image">
                `.trim()).join(``)}
              </div>
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>
      </div>
    `.trim();
  }
}
