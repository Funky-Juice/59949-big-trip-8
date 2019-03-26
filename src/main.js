import {renderFilters, renderTripPoints} from './screens/trips-screen';
import {pointsData, filtersList} from './data/data';
import './menu';


renderFilters(filtersList, pointsData);
renderTripPoints(pointsData);
