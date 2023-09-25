// pages/dashboard.js
import React from "react";
import Card from "../components/Card";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";

function Dashboard() {
  const [data, setData] = useState([]);
  const [inputAge, setInputAge] = useState("");
  const [inputRenda, setInputRenda] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [Means, setMeans] = useState({
    Age: 0,
    Annual_Income: 0,
    Spending_Score: 0,
  });

  const handleSaveData = async () => {
    try {
      const token = Cookies.get("token");
      await axios
        .post(
          "http://localhost:8000/dash/",
          {
            Age: inputAge,
            Annual_Income: inputRenda,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log("post response: ", res);
        });
    } catch (err) {
      console.log("Erro em fazer o post: ", err);
    }
  };

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
      <div className="dash-header">
        <h1>Dashboard Simples</h1>
        <Button className="button" onClick={() => setShowModal(true)}>
          Add Costumer
        </Button>
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          contentLabel="Insert new costumer"
          className="modal-content"
        >
          <h2>Insert new costumer</h2>
          <div className="input-div">
            <input
              type="number"
              placeholder="Age"
              onChange={(e) => setInputAge(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Annual Income"
              onChange={(e) => setInputRenda(e.target.value)}
              required
            />
          </div>
          <div className="buttons-div">
            <button className="modal-button" onClick={() => handleSaveData()}>
              Save Costumer
            </button>
            <button
              className="modal-button red"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
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
