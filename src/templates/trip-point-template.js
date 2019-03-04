
export default (point) => `\
  <article class="trip-point">
    <i class="trip-icon">${point.icon}</i>
    <h3 class="trip-point__title">${point.type} to ${point.title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">10:00&nbsp;&mdash; 11:00</span>
      <span class="trip-point__duration">1h 30m</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
    <ul class="trip-point__offers">
      ${point.offers.map((offer) => `\
        <li>
          <button class="trip-point__offer">${offer.name} +&euro;&nbsp;${offer.price}</button>
        </li>
      `).join(``)}
    </ul>
  </article>
`;
