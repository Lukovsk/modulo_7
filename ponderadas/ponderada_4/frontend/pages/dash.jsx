// pages/dashboard.js
import React from "react";
import Card from "../components/Card";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);
  const [Means, setMeans] = useState({
    Age: 0,
    Annual_Income: 0,
    Spending_Score: 0,
  });

  let loadData = async () => {
    try {
      await axios.get("http://localhost:8000/dash/").then((data) => {
        let newData = {
          Age: [],
          Annual_Income: [],
          Spending_Score: [],
        };
        let newMeans = {
          Age: 0,
          Annual_Income: 0,
          Spending_Score: 0,
        };
        for (let i = 0; i < data.data.length; i++) {
          newData["Age"].push(data.data[i]["Age"]);
          newData["Annual_Income"].push(data.data[i]["Annual_Income"]);
          newData["Spending_Score"].push(data.data[i]["Spending_Score"]);
          newMeans["Age"] += data.data[i]["Age"] / data.data.length;
          newMeans["Annual_Income"] += data.data[i]["Age"] / data.data.length;
          newMeans["Spending_Score"] +=
            data.data[i]["Spending_Score"] / data.data.length;
        }

        setData(newData);
        setMeans(newMeans);
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
          <Card
            title="Média de renda dos clientes"
            content={"R$" + Means.Annual_Income.toFixed(4)}
          />
          <Card
            title="Média da pontuação de gastos dos clientes"
            content={Means.Spending_Score.toFixed(4)}
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
