radarCanvas.height = canvasSize;
radarCanvas.width = canvasSize;
radarCanvas.style.height = canvasSize;
radarCanvas.style.width = canvasSize;
let radarAirport = window.opener.currentAirport;
let activeRunways = window.opener.activeRunways;
// make window fit content
window.resizeBy(windowWidth - window.innerWidth, windowSize - window.innerHeight);

const sidebar = document.getElementById('sidebar');
const sectorElementTemplate = document.getElementById('templateItem');

// let mainColor = '#8bf688';
// let mainColor = 'white';

window.addEventListener('message', ev => {
  let msg = ev.data;
  if (msg.type == 'airport_change') {
    let newAirport = msg.airport;
    radarAirport = newAirport;
    if (Settings.get('loadRadarChart'))
      radarCanvas.style.backgroundImage = `url(../radars/${newAirport}.png)`;

    // update adjacent sector sidebar
    updateSidebar(newAirport);

    window.requestAnimationFrame(redrawRadarScreen);
  } else if (msg.type == 'runway_changes') {
    let newActiveRunways = msg.runways;
    activeRunways = newActiveRunways;
    window.requestAnimationFrame(redrawRadarScreen);
  }
});

window.requestAnimationFrame(redrawRadarScreen);
window.requestAnimationFrame(alertParentWindow);
updateSidebar(radarAirport);

function alertParentWindow() {
  window.requestAnimationFrame(alertParentWindow);
  opener.radarWindow = window;
}

function updateSidebar(icao) {
  while (sidebar.lastChild) {
    sidebar.firstChild.remove();
  }

  let adjacentSectors = getAdjacentSectors(icao);
  console.log(adjacentSectors);
  for (let i = 0; i < adjacentSectors.length; i++) {
    const sector = adjacentSectors[i];
    let newSector = sectorElementTemplate.cloneNode(true);
    newSector.id = 'sector';
    newSector.querySelector('#name').innerText = sector.name;
    newSector.querySelector(
      '#callsignAndFrequency'
    ).innerText = `${sector.callsign} ${sector.frequency}`;
    newSector.querySelector('#hdg').innerText = `HDG ${sector.hdg}`;

    sidebar.appendChild(newSector);
  }
}

function getAdjacentSectors(icao) {
  let data = [];
  let adjacentSectors = [];
  for (const country in airports) {
    for (const airport of airports[country]) {
      if (airport.icao.toLowerCase() == icao) {
        if (!airport?.vectors) return;
        for (let i = 0; i < airport.vectors.length; i++) {
          const sector = airport.vectors[i];
          adjacentSectors.push(sector);
        }
        break;
      }
    }
  }

  for (let i = 0; i < adjacentSectors.length; i++) {
    const sector = adjacentSectors[i];
    let sectorData = sectors[sector.to];
    data.push(
      Object.assign(
        {
          hdg: sector.hdg,
        },
        sectorData
      )
    );
  }
  return data;
}
