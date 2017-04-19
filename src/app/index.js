
import {registerWorker} from './register-worker'
const speed = document.getElementById('speed');
const unitEl = document.getElementById('unit');

let index = 0;
const units = [{
  'factor' : 3.6,
  'unit' : 'km/h'
},{
  'factor' : 1.94384449,
  'unit' : 'knots'
},{
  'factor' : 2.23693629,
  'unit' : 'mph'
},{
  'factor' : 1,
  'unit' : 'm/s'
}];

const options = {
  enableHighAccuracy: true,
  maximumAge        : 250
}

const success = (e) =>
  speed.textContent = parseInt(e.coords.speed * units[index].factor);

const error = (e) => {
  speed.textContent = e.message;
  unitEl.textContent = ':-(';
}

navigator.geolocation.watchPosition(success, error, options);

const toggleUnit = (e) => {
  if (e.target.tagname = 'BUTTON') {
    index = +e.target.id
    unitEl.textContent = units[index].unit
  }
}

document.body.addEventListener('click', toggleUnit, false)

// registerWorker()
