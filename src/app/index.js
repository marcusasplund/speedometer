
import {registerWorker} from './register-worker'
const speed = document.getElementById('speed')
const unitEl = document.getElementById('unit')
const altitude = document.getElementById('altitude')
const altitudeUnitEl = document.getElementById('altitudeUnitEl')
const altitudeEl = document.getElementById('altitudeEl')
const errorEl = document.getElementById('errorEl')

let index = 0
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
  speed.textContent = parseInt(e.coords.speed * units[index].factor)
  altitude.textContent = parseInt(e.coords.altitude * altitudeUnits[altitudeIndex].factor)
}

const error = (e) => {
  errorEl.textContent = e.message
  unitEl.textContent = ':-('
}

navigator.geolocation.watchPosition(success, error, options)

const toggleUnit = (e) => {
  if (e.target.tagName === 'BUTTON') {
    index = +e.target.id
    unitEl.textContent = units[+e.target.id].unit
  }
}

const toggleAltitudeVisibility = (e) => {
  altitudeEl.classList.toggle('hidden')
}

const toggleAltitudeUnit = (e) => {
  if (e.target.tagName === 'BUTTON') {
    altitudeIndex = +e.target.id
    altitudeUnitEl.textContent = altitudeUnits[altitudeIndex].unit
  }
}

document.getElementById('unitToggles').addEventListener('click', toggleUnit, false)
document.getElementById('showAltitude').addEventListener('click', toggleAltitudeVisibility, false)
document.getElementById('altitudeEl').addEventListener('click', toggleAltitudeUnit, false)

registerWorker()
