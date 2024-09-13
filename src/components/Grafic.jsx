import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Регистрация необходимых компонентов Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Grafic({ currentData, consumptionData, labels }) {
  // Данные для графика с двумя наборами данных
  const chartData = {
    labels: labels, // Метки для оси X
    datasets: [
      {
        label: 'Потраченная сумма',
        data: consumptionData, // Данные для расходов
        backgroundColor: 'rgba(75, 192, 192, 0.5)', // Цвет для столбцов расходов
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'График расходов и текущей цены',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default Grafic;
