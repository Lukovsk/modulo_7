// pages/dashboard.js
import React from "react";
import Card from "../components/Card";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);

  let loadData = async () => {
    try {
      await axios.get("http://localhost:8000/dash/").then((data) => {
        let newData = {
          Age: [],
          Annual_Income: [],
          Spending_Score: [],
        };
        for (let i = 0; i < data.data.length; i++) {
          newData["Age"].push(data.data[i]["Age"]);
          newData["Annual_Income"].push(data.data[i]["Annual_Income"]);
          newData["Spending_Score"].push(data.data[i]["Spending_Score"]);
        }
        print(newData.Spending_Score);
        setData(newData);
      });
    } catch (err) {
      console.log("Erro ao pegar a resposta: ", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>Dashboard Simples</h1>
      <div className="dashboard">
        <div className="cards">
          <Card title="Média de renda dos clientes" content="$10,000" />
          <Card
            title="Média da pontuação de gastos dos clientes"
            content="500"
          />
        </div>
        <div className="graphs">
          <BarChart
            data={{
              labels: data.Age,
              values: data.Annual_Income,
              label: "Renda",
            }}
          />
          <PieChart data={data.Spending_Score} />
          <BarChart
            data={{
              labels: data.Age,
              values: data.Spending_Score,
              label: "Spending Score",
            }}
          />
          <PieChart data={data.Annual_Income} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
