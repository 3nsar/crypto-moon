import { useParams } from "react-router-dom";
import { chartDays } from "../config/data"
import useAxios from "../hooks/useAxios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


const HistoryChart = () => {
  const { id } = useParams();
  const { response } = useAxios(`coins/${id}/market_chart?vs_currency=usd&days=30`);

  if(!response) {
    return (
      <div>
        loading...
      </div>
    )
  }

  const coinChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));
  
  const options = {
    responsive: true
  }
  const data = {
    labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: false,
        label: id,
        data: coinChartData.map(val => val.y),
        borderColor: 'rgba(48,79,254) ',
        backgroundColor: 'rgba(48,79,254, 0.5) ',
        pointRadius: 0,
      }
    ]
  }
 
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}

export default HistoryChart