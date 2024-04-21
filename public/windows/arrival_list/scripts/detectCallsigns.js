/**
 * maybe use this to remove unnecessary additions
 * atc24 players add into their callsigns for no reason
 */
const stringInBracketsRegex = / ?\([\s\S]*?\)/g;

function detectCallsign(callsignString) {
  let firstWordRegex = /^([A-Z a-z]*)/g;
  let firstWord = firstWordRegex.exec(callsignString)[0].trim();
  let callsign = callsignString;
  if (firstWord.length > 3) {
    // reverse search
    for (const icaoCode in airlineTable) {
      let airlineData = airlineTable[icaoCode];
      if (airlineData.name.toLowerCase() == firstWord.toLowerCase()) {
        callsign = airlineData.callsign;
        let newFullCallsign = `${icaoCode}${callsignString.substring(firstWord.length)}`;
        callsign = newFullCallsign;
        break;
      } else if (airlineData.callsign.toLowerCase() == firstWord.toLowerCase()) {
        callsign = airlineData.callsign;
        let newFullCallsign = `${icaoCode}${callsignString.substring(firstWord.length)}`;
        callsign = newFullCallsign;
        break;
      }
    }
  }
  if (callsign[3] !== '-') {
    if (callsign[3] == ' ') {
      callsign = callsign.replace(' ', '-');
    } else {
      callsign = `${callsign.substring(0, 3)}-${callsign.substring(3, callsign.length)}`;
    }
  }
  if (callsign.toLowerCase().endsWith('heavy')) {
    callsign = callsign.replace(/heavy/gi, '/H');
  }

  if (callsign.toLowerCase().endsWith('super')) {
    callsign = callsign.replace(/super/gi, '/J');
  }

  return callsign;
}

function validateAircraftType(givenTypeName) {
  for (let i = 0; i < planeTypes.length; i++) {
    const planeType = planeTypes[i];
    if (planeType?.typeCode?.toLowerCase() == givenTypeName?.toLowerCase())
      return planeType.typeCode;
    else {
      for (let j = 0; j < planeType.names.length; j++) {
        const name = planeType.names[j];
        if (name.includes(givenTypeName.toLowerCase())) return planeType.typeCode;
        if (givenTypeName.toLowerCase().includes(name.toLowerCase())) return planeType.typeCode;
      }
    }
  }

  // if it is not detected, leave it
  return givenTypeName;
}
