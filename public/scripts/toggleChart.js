const toggleChart = document.getElementById('toggleChart');
const chartSection = document.querySelector('.chartContainer');
const mainSection = document.querySelector('.main');

toggleChart.addEventListener('click', e => {
  let chartIsHidden = toggleChart.getAttribute('data-is-hidden');

  if (chartIsHidden == 'true') {
    chartSection.style.display = 'flex';
    mainSection.style.gridTemplateColumns = 'minmax(0, 1.5fr) 4fr';
    toggleChart.setAttribute('data-is-hidden', 'false');
  } else {
    chartSection.style.display = 'none';
    mainSection.style.gridTemplateColumns = '1fr';
    toggleChart.setAttribute('data-is-hidden', 'true');
  }
});
