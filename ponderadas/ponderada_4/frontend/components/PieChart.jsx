import React from "react";
import { Pie } from "react-chartjs-2";

const formatSpendingScoreData = (data = []) => {
  const spendingScoreData = {
    labels: ["Baixo", "Médio", "Alto"],
    values: [0, 0, 0], // Inicialize com contagens zero para cada categoria
  };

  data.forEach((spendingScore) => {
    if (spendingScore <= 0.33) {
      spendingScoreData.values[0]++; // Categoria "Baixo"
    } else if (spendingScore <= 0.66) {
      spendingScoreData.values[1]++; // Categoria "Médio"
    } else {
      spendingScoreData.values[2]++; // Categoria "Alto"
    }
  });

  return spendingScoreData;
};

function PieChart({ data }) {
  data = formatSpendingScoreData(data);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: ["red", "yellow", "green"], // Cores para cada fatia do gráfico
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom", // Posição da legenda
      },
    },
  };

  return (
    <div className="chart">
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default PieChart;
