const radarCanvas = document.getElementById('radar');
const windowSize = 500;
const windowWidth = 600;
const resolutionScale = 2;
const canvasSize = windowSize * resolutionScale;
const defaultLineWidth = 2 * resolutionScale;
const runwayColor = '#9c9c9c';
const runwayWidth = 8 * resolutionScale;
const circleCenterAndRadius = canvasSize / 2;
const radarWidth = 24; // nautical miles
const nmPerPixel = radarWidth / canvasSize;
const ftPerNm = 6076.125;

const ilsDistance = 9; // nautical miles
const ilsColor = '#fff';
const threeMileMarkerWidth = 0.25; // nautical miles
const threeMileMarkerThickness = 4;
const dashDivider = 9;
const ilsDashSequence = [nmToPixel(3) / dashDivider, nmToPixel(3) / dashDivider];

const terrainMefColor = '#acacac';
let mainColor = 'white';

// 1nm = 6076.125ft

/** @type {CanvasRenderingContext2D} */
const ctx = radarCanvas.getContext('2d');

function nmToPixel(nm) {
  return nm / nmPerPixel;
}

function feetToPixel(ft) {
  return nmToPixel(ft / ftPerNm) * 3.5;
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y

  return {
    x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
  };
}

function movePointAlongAngle(vPoint, distance, angle) {
  return new Vec(
    vPoint.x + distance * Math.cos(degrees_to_radians(angle) - degrees_to_radians(90)),
    vPoint.y + distance * Math.sin(degrees_to_radians(angle) - degrees_to_radians(90))
  );
}

function getRunwayIdentifier(hdg) {
  return Math.round(hdg / 10)
    .toString()
    .padStart(2, '0');
}

function flipHeading(hdg) {
  return hdg <= 180 ? hdg + 180 : hdg - 180;
}

const sectors = {
  isau: {
    name: 'Brighton',
    callsign: 'ISAU_CTR',
    frequency: '127.820',
  },
  irfd: {
    name: 'Chicago',
    callsign: 'IRFD_CTR',
    frequency: '124.850',
  },
  ilar: {
    name: 'Lazarus',
    callsign: 'ILAR_CTR',
    frequency: '126.300',
  },
  izol: {
    name: 'Norsom',
    callsign: 'IZOL_CTR',
    frequency: '124.640',
  },
  ibth: {
    name: 'Sotaf',
    callsign: 'IBTH_CTR',
    frequency: '128.600',
  },
  igrv: {
    name: 'Keplavik',
    callsign: 'IGRV_CTR',
    frequency: '126.750',
  },
  itko: {
    name: 'Tokyo',
    callsign: 'ITKO_CTR',
    frequency: '132.300',
  },
  ipph: {
    name: 'Perth',
    callsign: 'IPPH_CTR',
    frequency: '135.250',
  },
};
