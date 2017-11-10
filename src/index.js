
import {registerWorker} from './utils/register-worker'
const speed = document.getElementById('speed')
const unitEl = document.getElementById('unit')
const altitude = document.getElementById('altitude')
const altitudeUnitEl = document.getElementById('altitudeUnitEl')
const altitudeEl = document.getElementById('altitudeEl')
const errorEl = document.getElementById('errorEl')
const start = document.getElementById('start')

let unitIndex = 0
let altitudeIndex = 0

const units = [{
  'factor': 3.6,
  'unit': 'km/h'
}, {
  'factor': 1.94384449,
  'unit': 'knots'
}, {
  'factor': 2.23693629,
  'unit': 'mph'
}, {
  'factor': 1,
  'unit': 'm/s'
}]

const altitudeUnits = [{
  'factor': 1,
  'unit': 'm'
}, {
  'factor': 3.28,
  'unit': 'feet'
}]

const options = {
  enableHighAccuracy: true,
  maximumAge: 250
}

const success = (e) => {
  speed.textContent = parseInt(e.coords.speed * units[unitIndex].factor)
  altitude.textContent = parseInt(e.coords.altitude * altitudeUnits[altitudeIndex].factor)
}

const error = (e) => {
  errorEl.textContent = e.message
  unitEl.textContent = ':-('
}

const startSpeedo = () => {
  navigator.geolocation.watchPosition(success, error, options)
  start.remove()
}

const toggleUnit = (e) => {
  if (e.target.tagName === 'BUTTON') {
    unitIndex = +e.target.dataset.index
    unitEl.textContent = units[+e.target.dataset.index].unit
  }
}

const toggleAltitudeVisibility = (e) => {
  altitudeEl.classList.toggle('hidden')
}

const toggleAltitudeUnit = (e) => {
  if (e.target.tagName === 'BUTTON') {
    altitudeIndex = +e.target.dataset.index
    altitudeUnitEl.textContent = altitudeUnits[altitudeIndex].unit
  }
}

document.getElementById('unitToggles').addEventListener('click', toggleUnit, false)
document.getElementById('showAltitude').addEventListener('click', toggleAltitudeVisibility, false)
altitudeEl.addEventListener('click', toggleAltitudeUnit, false)
start.addEventListener('click', startSpeedo, false)

// Register service worker if not on localhost
const local = window.location.host.startsWith('localhost')
if ('serviceWorker' in navigator && !local) {
  registerWorker()
}
