function detectCallsign(triggeredElement) {
  let callsign = triggeredElement.value.substring(0, 3).toUpperCase();
  let airline = airlineTable[callsign]?.name || '-';
  let strip = triggeredElement.parentElement.parentElement;
  strip.querySelector('p.callsignSpoken').textContent = airline;
}
