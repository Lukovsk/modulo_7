import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function BarChart({ data }) {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Se houver um gráfico existente, destrua-o antes de criar um novo
    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: data.label,
            data: data.values,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChart(newChart);
  }, [data]);

  return (
    <div className="chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default BarChart;
