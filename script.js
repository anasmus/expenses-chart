fetch('./assets/data.json')
  .then(response => response.json())
  .then(main);

function main(data) {
  const chart = document.getElementById('chart');
  const totalBarHeight = 200 - 27 - 50;
  const totalSpending = data.reduce((total, item) => total + item.amount, 0);
  const highestAmount = data.reduce((highest, item) => highest > item.amount ? highest : item.amount , 0);
  const currentDay = data.slice(new Date().getDay() - 1)[0].day;
  
  document.getElementById('spending').innerText = `$${totalSpending.toFixed(2)}`;
  data.forEach(createChart);
  
  
  function createChart(item) {
    chart.innerHTML += `<div class="chart-part">
                          <span>${item.day}</span>
                          <div class="${item.day === currentDay ? 'bar current' : 'bar'}" style="height: ${barHeight(item.amount)}px"></div>
                          <span class='amount'>$${item.amount}</span>
                        </div>`
  }
  
  // barHeight is determined based on the percentage of highestAmount wrt to totalBarHeight
  function barHeight(amount) {
    const percentageOfHighest = (amount / highestAmount);
    return percentageOfHighest * totalBarHeight;
  }
}