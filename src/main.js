import {renderFilters, renderTripPoints} from './render-elems';
import {pointsData, filtersList} from './data/data';
import './menu';


renderFilters(filtersList, pointsData);
renderTripPoints(pointsData);
