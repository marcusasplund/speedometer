const speed = document.querySelector('#speed')
const unitEl = document.querySelector('#unit')
const altitude = document.querySelector('#altitude')
const altitudeUnitEl = document.querySelector('#altitudeUnitEl')
const altitudeEl = document.querySelector('#altitudeEl')
const errorEl = document.querySelector('#errorEl')
const start = document.querySelector('#start')

let unitIndex = 0
let altitudeIndex = 0

const units = [{
  factor: 3.6,
  unit: 'km/h'
}, {
  factor: 1.94384449,
  unit: 'knots'
}, {
  factor: 2.23693629,
  unit: 'mph'
}, {
  factor: 1,
  unit: 'm/s'
}]

const altitudeUnits = [{
  factor: 1,
  unit: 'm'
}, {
  factor: 3.28,
  unit: 'feet'
}]

const options = {
  enableHighAccuracy: true,
  maximumAge: 250
}

const success = (e) => {
  speed.textContent = parseInt(e.coords.speed * units[unitIndex].factor)
  altitude.textContent = parseInt(e.coords.altitude * altitudeUnits[altitudeIndex].factor)
  errorEl.textContent = ''
  unitEl.textContent = units[unitIndex].unit
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
  unitIndex = +e.target.value
  unitEl.textContent = units[unitIndex].unit
}

const toggleAltitudeVisibility = (e) => {
  altitudeEl.classList.toggle('hidden')
}

const toggleAltitudeUnit = (e) => {
  altitudeIndex = +e.target.value
  altitudeUnitEl.textContent = altitudeUnits[altitudeIndex].unit
}

document.querySelectorAll('.speedToggles').forEach(item => {
  item.addEventListener('click', toggleUnit, false)
})

document.querySelector('#showAltitude').addEventListener('click', toggleAltitudeVisibility, false)

document.querySelectorAll('.altToggles').forEach(item => {
  item.addEventListener('click', toggleAltitudeUnit, false)
})

start.addEventListener('click', startSpeedo, false)
