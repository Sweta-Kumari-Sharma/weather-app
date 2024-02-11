// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const PieChart = ({ data }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     if (data && chartRef.current) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy(); // Destroy previous chart instance
//       }

//       const labels = data.map(city => city.name);
//       const assets = data.map(city => city.assets);

//       const ctx = chartRef.current.getContext('2d');
//       chartInstance.current = new Chart(ctx, {
//         type: 'pie',
//         data: {
//           labels: labels,
//           datasets: [{
//             label: 'Asset Allocation',
//             data: assets,
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
//           }]
//         }
//       });
//     }
//   }, [data]);

//   return <canvas ref={chartRef} className='w-[50px]'/>;
// };

// export default PieChart;

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy previous chart instance
      }

      const labels = Object.keys(data);
      const assets = Object.values(data);

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Asset Allocation',
            data: assets,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          }]
        }
      });
    }
  }, [data]);

  return <div className='my-4'>
    <h3 className='text-center'>Asset Allocation</h3>
  <canvas ref={chartRef}  /></div>;
};

export default PieChart;

