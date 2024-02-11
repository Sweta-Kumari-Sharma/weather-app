import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  // Extract labels and dataset from the data
  const labels = data.map(entry => entry.year);
  const dataset = data.map(entry => entry.performance); // Assuming entry.performance is a single value

  // Define chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Fund Performance',
        data: dataset,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      {/* <h3 className='text-center'>Fund Performance</h3> */}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
