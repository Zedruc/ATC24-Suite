// let radarWindow = window.open('', 'radar'); // try to get handle on exisiting window in case of reload
let ArrivalWindowFeatures = 'width=520,height=350';

function openArrivalWindow() {
  try {
    window.atisWindow = window.open(
      './windows/arrival_list/index.html',
      'arrival_list',
      ArrivalWindowFeatures
    );
  } catch (error) {
    notificationQueue.queue({
      title: 'Whoops!',
      text: 'In order to use the Arrival List, please allow popup windows',
      icon: 'error',
    });
  }
}
