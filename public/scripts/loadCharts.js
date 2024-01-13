for (const island in airports) {
  for (const airport of airports[island]) {
    let img = new Image();
    img.src = `./charts/${airport.icao}/${airport.icao} Ground Chart.png`;
  }
}
