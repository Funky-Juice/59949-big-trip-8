import {renderFilters, renderTripPoints} from './screens/trips-screen';
import {pointsData, filtersList} from './data/data';
import Api from './api';
import './menu';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const API_URL = `https://es8-demo-srv.appspot.com/big-trip`;

const api = new Api(API_URL, AUTHORIZATION);

renderFilters(filtersList, pointsData);
renderTripPoints(pointsData);
