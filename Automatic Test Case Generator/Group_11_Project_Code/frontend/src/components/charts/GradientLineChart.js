import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const GradientLineChart = (props) => {
  const chartRef = useRef(null);
  const [data,setData]=useState(props.data.coverageMetrics)

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Statements', 'Branches', 'Functions', 'Condition',"MC/DC","Path"],
        datasets: [
          {
            label: 'Un able to cover',
            data: [Number(data.totalStatements)-Number(data.coveredStatements), Number(data.totalBranches)-Number(data.coveredBranches),  Number(data.totalFunctions)-Number(data.coveredFunctions), Number(data.totalConditions)-Number(data.coveredConditions),Number(data.totalDecisions)-Number(data.coveredDecisions),Number(data.totalPathStatements)-Number(data.coveredPathStatements)],
            borderColor: '#000000',
            backgroundColor: createGradient(ctx, '#3533CD','#6f6edb'),
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  const createGradient = (ctx, color1, color2) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  return (
    <div>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default GradientLineChart;
