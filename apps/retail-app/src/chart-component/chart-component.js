// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './chart-component.scss';
import '@finastra/charts';

export function Chart() {

  const pieCharts = document.querySelectorAll('#pieChart');
        pieCharts.forEach((pieChart) => {
        pieChart.data = [44, 55, 13, 43, 22]
        pieChart.labels = ['Apple', 'Mango', 'Orange', 'Watermelon', 'Wiki']})

  return (
    <div className="chart">
      <div className="chart-content">
        <div className="chart-title">
          <span>Analytics</span>
        </div>        
        
      </div>
      <div className="donut-chart">
        <fds-donut-chart theme="dark" id="pieChart"  width="300px" height="300px"></fds-donut-chart>
      </div>
      
    </div>
  );
}

export default Chart;
