// let radarWindow = window.open('', 'radar'); // try to get handle on exisiting window in case of reload
let windowFeatures = 'width=500,height=500';

function openRadarWindow() {
  try {
    window.radarWindow = window.open('./windows/radar.html', 'radar', ATISwindowFeatures);
  } catch (error) {
    notificationQueue.queue({
      title: 'Whoops!',
      text: 'In order to use the ATIS generator, please allow popup windows',
      icon: 'error',
    });
  }
}
