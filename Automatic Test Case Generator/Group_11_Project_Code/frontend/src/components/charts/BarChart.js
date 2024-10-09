// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const BarChart = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext('2d');

//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [
//           {
//             label: 'My Bar Chart',
//             data: [65, 59, 80, 81, 56, 55, 40],
//             backgroundColor: 'rgba(75,192,192,0.6)',
//             borderColor: 'rgba(75,192,192,1)',
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           x: { beginAtZero: true },
//           y: { beginAtZero: true },
//         },
//       },
//     });
//   }, []);

//   return (
//     <div>
//       <canvas ref={chartRef} width="400" height="200"></canvas>
//     </div>
//   );
// };

// export default BarChart;
import React, { useEffect, useRef ,useState} from 'react';
import Chart from 'chart.js/auto';

const GradientBarChart = (props) => {
  const chartRef = useRef(null);
  const [data,setData]=useState(props.data.coverageMetrics)

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Statements', 'Branches', 'Functions', 'Condition',"MC/DC","Path"],
        datasets: [
          {
            label: 'Coverage in percentage',
            data: [Number(data.statementCoverage), Number(data.branchCoverage), Number(data.functionalCoverage), Number(data.conditionCoverage), Number(data.multipleConditionDecisionCoverage), Number(data.pathCoverage)],
            backgroundColor: createGradient(ctx,'#3533CD','#6f6edb'),
            borderColor: '#000000',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true },
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

export default GradientBarChart;
