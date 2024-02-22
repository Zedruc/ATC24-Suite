async function clearanceFromFlightPlan(target) {
  let rawPlan = await navigator.clipboard.readText();
  if (!(rawPlan.length > 80)) return;

  let rawInfo = rawPlan.startsWith('U')
    ? rawPlan.split('\n').slice(1, 8)
    : rawPlan.split('\r\n').slice(0, 7);
  let data = {};
  for (let i = 0; i < rawInfo.length; i++) {
    let [key, value] = rawInfo[i].replace(' ', '').split(':');

    data[key.toLowerCase()] = key.toLowerCase() == 'flightrules' ? value.replace(' ', '') : value;
  }

  // update strip with flight plan data
  let strip = target.parentElement.parentElement;
  let squawkField = strip.querySelector('#squawk');
  let callsignField = strip.querySelector('#callsign');
  let arrivingField = strip.querySelector('#arrival');
  let aircraftField = strip.querySelector('#aircraft');
  let altitudeField = strip.querySelector('#altitude');
  let routeField = strip.querySelector('#route');

  callsignField.value = data.callsign;
  detectCallsign(callsignField);
  arrivingField.value = data.arriving;
  aircraftField.value = validateAircraftType(data.aircraft);
  altitudeField.value = data.flightlevel;
  let clearance;
  let isGpsRouting =
    data.route.toLowerCase().includes('gps') || data.route.toLowerCase().includes('n/a');
  let departureSid;
  if (!isGpsRouting) {
    departureSid = detectDepartureRouting(data.route);
    routeField.innerText = data.route;
    // routeField.setAttribute('disabled', 'true');
  } else {
    departureSid = 'GPS';
    routeField.innerText = 'GPS Direct';
  }

  if (data.flightrules.toLowerCase() == 'ifr') {
    clearance = `CLR ${data.arriving} ${isGpsRouting ? 'GPS' : departureSid} FPL ${
      isGpsRouting ? 'CLB' : 'CVS'
    } FL${data.flightlevel} DEP [ ] ?SQ`;
  } else if (data.flightrules.toLowerCase() == 'vfr') {
    squawkField.value = '7000';
    clearance = `VFR`;
  }
  if (departureSid)
    target.parentElement.parentElement.querySelector('#sidstar').value = departureSid;
  if (Settings.get('generateClearance')) {
    target.value = clearance;
  } else {
    target.remove();
  }
  StripSaveManager.updateStrip(strip, strip.parentElement);
}

function detectDepartureRouting(route) {
  let icaoAndSidRegex =
    /([A-Z]{4}(\/| |\/\/)[0-9]{2}[RLC]?)(?: |>>|>|-|\/\/)([A-Z]{3,5}[0-9]{1}[A-Z]{1})/g;
  let sidOnlyRegex = /([A-Z]{3,5}[0-9]{1}[A-Z]{1})/g;

  let result1 = icaoAndSidRegex.exec(route);
  if (result1) return result1[3];

  let result2 = sidOnlyRegex.exec(route);
  if (result2) return result2[1];

  return false;
}

function validateAircraftType(givenTypeName) {
  for (let i = 0; i < planeTypes.length; i++) {
    const planeType = planeTypes[i];
    if (planeType.typeCode.toLowerCase() == givenTypeName.toLowerCase()) return planeType.typeCode;
    else {
      for (let j = 0; j < planeType.names.length; j++) {
        const names = planeType.names[j];
        if (names.includes(givenTypeName.toLowerCase())) return planeType.typeCode;
      }
    }
  }

  // if it is not detected, leave it
  return givenTypeName;
}
