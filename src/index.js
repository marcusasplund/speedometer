const $ = selector => document.querySelector(selector)
const units = [
  { factor: 3.6, unit: 'km/h' },
  { factor: 1.94384449, unit: 'knots' },
  { factor: 2.23693629, unit: 'mph' },
  { factor: 1, unit: 'm/s' }
]
const vehicles = [
  { name: 'Bicycle', max: 40 },
  { name: 'Moped', max: 80 },
  { name: 'Car', max: 240 },
  { name: 'Aircraft', max: 1200 }
]
let unitIndex = 0
let vehicleIndex = 0
let speed = null
let altitude = null
let watchId = null
let lastFix = 0
let scaleKey = ''
const point = (radius, angle) => {
  const radians = angle * Math.PI / 180
  return [250 + radius * Math.sin(radians), 250 - radius * Math.cos(radians)]
}
const render = () => {
  const unit = units[unitIndex]
  const kmh = (speed || 0) * 3.6
  if ($('#vehicle').value === 'auto') {
    while (vehicleIndex < vehicles.length - 1 && kmh > vehicles[vehicleIndex].max * 0.9) vehicleIndex++
    while (vehicleIndex > 0 && kmh < vehicles[vehicleIndex - 1].max * 0.65) vehicleIndex--
  } else vehicleIndex = Number($('#vehicle').value)
  const vehicle = vehicles[vehicleIndex]
  const baseMax = vehicle.max / 3.6 * unit.factor
  const step = Math.max(1, Math.ceil((baseMax / 8 - 1e-9) / Math.pow(10, Math.floor(Math.log10(baseMax / 8)))) * Math.pow(10, Math.floor(Math.log10(baseMax / 8))))
  const max = step * 8
  const key = `${max}-${unitIndex}`
  if (key !== scaleKey) {
    scaleKey = key
    let ticks = ''
    for (let i = 0; i <= 40; i++) {
      const angle = -130 + i / 40 * 260
      const major = i % 5 === 0
      const a = point(218, angle)
      const b = point(major ? 198 : 208, angle)
      ticks += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="${major ? 'major' : 'minor'}" />`
      if (major) {
        const p = point(174, angle)
        ticks += `<text x="${p[0]}" y="${p[1]}" dy=".35em">${Math.round(i / 40 * max)}</text>`
      }
    }
    $('#ticks').innerHTML = ticks
  }
  $('#needle').style.transform = `rotate(${-130 + Math.min((speed || 0) * unit.factor / max, 1) * 260}deg)`
  $('#speed').textContent = speed === null ? '—' : Math.round(speed * unit.factor)
  $('#unit').textContent = unit.unit
  $('#altitude').textContent = altitude === null ? '—' : Math.round(altitude * Number($('#altitudeUnit').value))
}
const setStatus = (text, state) => {
  $('#status').textContent = text
  $('#status').dataset.state = state
}
const stop = () => {
  if (watchId !== null) navigator.geolocation.clearWatch(watchId)
  watchId = null
  $('#start').textContent = 'Start GPS'
}
$('#start').addEventListener('click', () => {
  if (watchId !== null) {
    stop()
    setStatus('GPS paused', 'idle')
    return
  }
  if (!navigator.geolocation) {
    setStatus('GPS is not supported in this browser.', 'error')
    return
  }
  setStatus('Searching for GPS signal…', 'waiting')
  $('#start').textContent = 'Pause GPS'
  watchId = navigator.geolocation.watchPosition(position => {
    lastFix = Date.now()
    speed = Number.isFinite(position.coords.speed) ? Math.max(0, position.coords.speed) : null
    altitude = Number.isFinite(position.coords.altitude) ? position.coords.altitude : null
    setStatus(speed === null ? 'GPS active · speed unavailable' : 'GPS active', 'active')
    render()
  }, error => {
    speed = null
    altitude = null
    render()
    if (error.code === 1) {
      stop()
      setStatus('Allow location access in your browser and try again.', 'error')
    } else setStatus('No GPS signal. Retrying…', 'waiting')
  }, { enableHighAccuracy: true, maximumAge: 250, timeout: 15000 })
})
$('#vehicle').addEventListener('change', render)
$('#speedUnit').addEventListener('change', event => {
  unitIndex = Number(event.target.value)
  render()
})
$('#showAltitude').addEventListener('change', event => {
  $('#altitudeEl').hidden = !event.target.checked
})
$('#altitudeUnit').addEventListener('change', render)
setInterval(() => {
  if (watchId !== null && lastFix && Date.now() - lastFix > 15000) {
    speed = null
    altitude = null
    render()
    setStatus('GPS signal is out of date. Retrying…', 'waiting')
  }
}, 5000)
render()
