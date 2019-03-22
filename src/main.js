import {renderFilters, renderTripPoints} from './render-elems';
import {dataTemplate, filtersList} from './data/data';
import {generateData} from './utils';
import './menu';

const pointsData = generateData(dataTemplate);

renderFilters(filtersList, pointsData);
renderTripPoints(pointsData);
