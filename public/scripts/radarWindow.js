// let radarWindow = window.open('', 'radar'); // try to get handle on exisiting window in case of reload
let windowFeatures = 'width=500,height=500';

function openRadarWindow() {
  try {
    window.radarWindow = window.open('./windows/radar.html', 'radar', windowFeatures);
  } catch (error) {
    swal({
      title: 'Whoops!',
      text: 'In order to use the radar screen, please allow popup windows',
      icon: 'error',
    });
  }
}
