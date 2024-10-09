import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const GradientPieChart = (props) => {
  const chartRef = useRef(null);
  const [data,setData]=useState(props.data.coverageMetrics)
  const createGradient = (ctx, colors) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    colors.forEach((color, index) => {
      gradient.addColorStop(index / (colors.length - 1), color);
    });
    return gradient;
  };

  useEffect(() => {
    console.log(Number(data.passedTests), Number(data.failedTests))
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'doughnut', // Use 'doughnut' type for a pie chart
      data: {
        labels: ['Passed Tests',"Failed Tests"],
        datasets: [
          {
            data: [Number(data.passedTests), Number(data.failedTests)],
            backgroundColor: createGradient(ctx, [ '#000000', '#3533CD','#6f6edb']),
            borderWidth: 1,
          },
        ],
      },
      options: {
        cutout: '70%', // Adjust the cutout percentage for a doughnut effect
      },
    });
  }, []);

 
  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default GradientPieChart;
