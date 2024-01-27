let radarWindow;
let windowFeatures = 'width=500,height=500';

function openRadarWindow() {
  try {
    radarWindow = window.open('./windows/radar.html', 'radar', windowFeatures);
  } catch (error) {
    swal({
      title: 'Whoops!',
      text: 'In order to use the radar screen, please allow popup windows',
      icon: 'error',
    });
  }
}
