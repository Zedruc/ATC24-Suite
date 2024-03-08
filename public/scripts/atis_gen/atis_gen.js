// let radarWindow = window.open('', 'radar'); // try to get handle on exisiting window in case of reload
let ATISwindowFeatures = 'width=1000,height=700';

function openATISWindow() {
  try {
    window.atisWindow = window.open(
      './windows/atis_gen/index.html',
      'atis_gen',
      ATISwindowFeatures
    );
  } catch (error) {
    notificationQueue.queue({
      title: 'Whoops!',
      text: 'In order to use the radar screen, please allow popup windows',
      icon: 'error',
    });
  }
}
