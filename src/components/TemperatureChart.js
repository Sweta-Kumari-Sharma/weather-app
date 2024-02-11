import React from 'react';
import { Line } from 'react-chartjs-2';

const TemperatureChart = ({ pastWeatherData }) => {
  // Extract temperature data and dates
  console.log('temp chart',pastWeatherData)
  const temperatures = pastWeatherData.map(entry => entry.temp);
  const dates = pastWeatherData.map(entry => {
    const date = new Date(entry.dt * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Format as MM/DD
  });

  // Reverse the arrays to display the most recent data first
  temperatures.reverse();
  dates.reverse();

  // Define chart data
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Temperature',
        data: temperatures,
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default TemperatureChart;
