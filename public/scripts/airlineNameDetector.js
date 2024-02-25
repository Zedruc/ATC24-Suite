function detectCallsign(triggeredElement) {
  let firstWordRegex = /^([A-Z a-z]*)/g;
  let firstWord = firstWordRegex.exec(triggeredElement.value)[0];
  console.log(firstWord);
  let callsign;
  if (firstWord.length > 3) {
    // reverse search
    for (const icaoCode in airlineTable) {
      let airlineData = airlineTable[icaoCode];
      if (airlineData.name.toLowerCase() == firstWord.toLowerCase()) {
        callsign = airlineData.callsign;
        let newFullCallsign = `${icaoCode}${triggeredElement.value.substring(firstWord.length)}`;
        triggeredElement.value = newFullCallsign;
        break;
      } else if (airlineData.callsign.toLowerCase() == firstWord.toLowerCase()) {
        callsign = airlineData.callsign;
        let newFullCallsign = `${icaoCode}${triggeredElement.value.substring(firstWord.length)}`;
        triggeredElement.value = newFullCallsign;
        break;
      }
    }
  } else {
    console.log('else');
    callsign = airlineTable[triggeredElement.value.substring(0, 3).toUpperCase()]?.callsign || '-';
  }
  let strip = triggeredElement.parentElement.parentElement;
  strip.querySelector('p.callsignSpoken').textContent = callsign;
}
