async function clearanceFromFlightPlan(target, isWebsocketUpdate = false, stripData) {
  // console.log(window.lastStripFPChange);
  // window.lastStripFPChange = true;
  // console.log(target);
  let hasToBeParsed = true;

  let rawPlan;
  if (isWebsocketUpdate) {
    rawPlan = stripData.info.flightplan;
  } else {
    rawPlan = await navigator.clipboard.readText();
  }

  let data = {};
  if (!(rawPlan?.length > 80)) {
    if (stripData?.info?.importRoute) {
      stripData.info.route = stripData.info.importRoute;
      hasToBeParsed = false;
      if (stripData.type.toLowerCase() !== 'vfr') stripData.info.flightrules = 'ifr';
    } else {
      return;
    }
  }

  /* if (isWebsocketUpdate) {
    data = flightPlanFromTransmittedString(rawPlan);
  } else { */
  if (hasToBeParsed) {
    let rawInfo = rawPlan.startsWith('U')
      ? rawPlan.split('\n').slice(1, 8)
      : rawPlan.split('\r\n').slice(0, 7);
    for (let i = 0; i < rawInfo.length; i++) {
      let [key, value] = rawInfo[i].replace(' ', '').split(':');
      data[key.toLowerCase()] = key.toLowerCase() == 'flightrules' ? value.replace(' ', '') : value;
    }
  } else {
    data = stripData.info;
    data.departing = data.departure;
    data.arriving = data.arrival;
    data.flightlevel = data.altitude;
  }
  console.log('dump');
  console.log(data);
  console.log(stripData);
  // }

  console.log(data);
  console.log('thats it rigfht there');

  // update strip with flight plan data
  let strip = target.parentElement.parentElement;
  // if (!hasToBeParsed) strip = target;

  let stripType = strip.getAttribute('data-type');
  if (isWebsocketUpdate) strip = target;
  let squawkField = strip.querySelector('#squawk');
  let callsignField = strip.querySelector('#callsign');
  let departingField = strip.querySelector('#departure');
  let arrivingField = strip.querySelector('#arrival');
  let aircraftField = strip.querySelector('#aircraft');
  let altitudeField = strip.querySelector('#altitude');
  let routeField = strip.querySelector('#route');

  if (data?.departing?.toLowerCase() != currentAirport.icao.toLowerCase())
    departingField.value = data.departing;
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
    if (data?.importRoute) routeField.innerText = data.importRoute;
    // routeField.setAttribute('disabled', 'true');
  } else {
    departureSid = '';
    routeField.innerText = data.route;
  }

  if (data.flightrules.toLowerCase() == 'ifr') {
    clearance = `CLR ${data.arriving} ${isGpsRouting ? 'GPS' : departureSid} FPL ${
      isGpsRouting ? 'CLB' : 'CVS'
    } FL${data.flightlevel} DEP [ ] ?SQ`;
    // strip.setAttribute('data-fp', clearance);
    strip.setAttribute('data-fp', rawPlan);
  } else if (data.flightrules.toLowerCase() == 'vfr') {
    squawkField.value = '7000';
    clearance = `VFR`;
  }
  /* if (departureSid)
    target.parentElement.parentElement.querySelector('#sidstar').value = departureSid; */
  if (Settings.get('generateClearance') && stripType == 'outbound') {
    if (target.id !== 'flightplan') strip.querySelector('#flightplan').value = clearance;
    else target.value = clearance;
  } else {
    console.log(target);
    if (target.id !== 'flightplan') target.querySelector('#flightplan').remove();
    else target.remove();
  }
  // window.lastStripFPChange = false;

  if (hasToBeParsed) StripSaveManager.updateStrip(strip, strip.parentElement);
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

function massReplace(str, wordArr, replacementArr) {
  let res = str;
  for (let i = 0; i < wordArr.length; i++) {
    res = res.replaceAll(wordArr[i], replacementArr[i]);
  }
  return res;
}

function flightPlanFromTransmittedString(str) {
  let planStr = massReplace(
    str,
    [
      'Username: ',
      ' Callsign: ',
      ' Aircraft: ',
      ' Flight Rules: ',
      ' Departing: ',
      ' Arriving: ',
      ' Route: ',
      ' Flight Level: ',
      ' _ _',
    ],
    ['', '#', '#', '#', '#', '#', '#', '#', '']
  );

  let plan = {};
  for (let i = 0; i < planStr.split('#').length; i++) {
    const value = planStr.split('#')[i];
    let keys = [
      'username',
      'callsign',
      'aircraft',
      'flightrules',
      'departing',
      'arriving',
      'route',
      'flightlevel',
    ];
    plan[keys[i]] = value;
  }
  return plan;
}

function clearanceFromAutomaticImport(stripElement, fpl) {
  // update strip with flight plan data from automatic import
  /**
   * Separate function since automatic imports
   * have their data transmitted as JSON from the ATC24 Bot
   * and not as string
   */
  let stripType = stripElement.dataset.type;
  let squawkField = stripElement.querySelector('#squawk');
  let callsignField = stripElement.querySelector('#callsign');
  let departingField = stripElement.querySelector('#departure');
  let arrivingField = stripElement.querySelector('#arrival');
  let aircraftField = stripElement.querySelector('#aircraft');
  let altitudeField = stripElement.querySelector('#altitude');
  let routeField = stripElement.querySelector('#route');
  let runwayField = stripElement.querySelector('#runway');

  runwayField.value = findFirstActiveRunway();

  if (fpl?.departing?.toLowerCase() != currentAirport.icao.toLowerCase())
    departingField.value = fpl.departing;
  callsignField.value = fpl.callsign;
  detectCallsign(callsignField);
  arrivingField.value = fpl.arriving;
  aircraftField.value = validateAircraftType(fpl.aircraft);
  altitudeField.value = fpl.altitude;
  let clearance;
  let isGpsRouting =
    fpl.route.toLowerCase().includes('gps') ||
    fpl.route.toLowerCase().includes('n/a') ||
    fpl.route.toLowerCase().includes('vector');
  let departureSid;
  if (!isGpsRouting) {
    departureSid = detectDepartureRouting(fpl.route);
    routeField.innerText = fpl.route;
    // routeField.setAttribute('disabled', 'true');
  } else {
    departureSid = '';
    routeField.innerText = fpl.route;
  }

  if (fpl.flightrules.toLowerCase() == 'ifr') {
    clearance = `CLR ${fpl.arriving} ${isGpsRouting ? 'GPS' : departureSid} FPL ${
      isGpsRouting ? 'CLB' : 'CVS'
    } FL${fpl.altitude} DEP [ ] ?SQ`;
    // strip.setAttribute('data-fp', clearance);
    // stripElement.setAttribute('data-fp', rawPlan);
    stripElement.dataset.route = fpl.route;
  } else if (fpl.flightrules.toLowerCase() == 'vfr') {
    squawkField.value = '7000';
    clearance = '';
  }
  // if (departureSid) stripElement.querySelector('#sidstar').value = departureSid;

  if (Settings.get('generateClearance') && stripType == 'outbound') {
    stripElement.querySelector('#flightplan').value = clearance;
  } else {
    stripElement.querySelector('#flightplan').remove();
  }
  // window.lastStripFPChange = false;
  StripSaveManager.updateStrip(stripElement, stripElement.parentElement);
}

function copyPDC(element) {
  let stripElement = element.parentElement.parentElement.parentElement.parentElement;

  let squawkField = stripElement.querySelector('#squawk');
  let callsignField = stripElement.querySelector('#callsign');
  let departingField = stripElement.querySelector('#departure');
  let arrivingField = stripElement.querySelector('#arrival');
  let aircraftField = stripElement.querySelector('#aircraft');
  let altitudeField = stripElement.querySelector('#altitude');
  let routeField = stripElement.querySelector('#route');

  let route = routeField.innerText;

  /**
   * CLR EDDL RWY 08L DEP GIVMI6Q INIT CLB FL070 SQUAWK 2325 WHEN RDY CALL FREQ 121.700 IF UNABLE CALL VOICE
   */
  let clearance;

  let isGpsRouting =
    route.toLowerCase().includes('gps') ||
    route.toLowerCase().includes('n/a') ||
    route.toLowerCase().includes('vector');
  let departureSid;
  if (!isGpsRouting) {
    departureSid = detectDepartureRouting(route);
    // routeField.setAttribute('disabled', 'true');
  } else {
    departureSid = '';
  }

  if (stripElement.dataset.type.toLowerCase() !== 'vfr') {
    let pdcTime = new Date();
    let day = pdcTime.getDate().toString().padStart(2, '0');
    let hour = pdcTime.getUTCHours().toString().padStart(2, '0');
    let minute = pdcTime.getUTCMinutes().toString().padStart(2, '0');

    clearance = `\`PDC GENERATED ${day}${hour}${minute}Z\nCLR ${
      arrivingField.value
    } RWY ${findFirstActiveRunway()} DEP ${isGpsRouting ? 'GPS' : departureSid} INIT CLB FL${
      altitudeField.value
    } SQUAWK ${squawkField.value} WHEN RDY CALL FREQ ${
      findStation('gnd').frequency
    } IF UNABLE CALL VOICE\``;
    // strip.setAttribute('data-fp', clearance);
    // stripElement.setAttribute('data-fp', rawPlan);
  } else {
    Toastify({
      text: `PDC for VFR Flights N/A`,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'bottom', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
    }).showToast();
    return;
  }
  // if (departureSid) stripElement.querySelector('#sidstar').value = departureSid;

  navigator.clipboard
    .writeText(clearance)
    .then(_ => {
      Toastify({
        text: `PDC for ${callsignField.value} copied to clipboard`,
        duration: 5000,
        newWindow: true,
        close: true,
        gravity: 'bottom', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
      }).showToast();
    })
    .catch(_ => {
      notificationQueue.queue({
        title: 'Error',
        html: "Could not copy pre departure clearance.<br/>Are you sure the website has access to your clipboard and/or you aren't using Firefox?",
        icon: 'error',
      });
    });
}

/* function findStation(type) {
  for (const station of currentAirport.stations) {
    if (station.type == type) return station;
  }
} */
