import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({income,labels}){
    const charData = {
        labels:labels,
        datasets:[
            {
                label: "Прибыль",
                data:income,
                backgroundColor:   'rgba(153, 102, 255, 0.5)', // Цвет для столбцов расходов
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    }
    const option = {
        responsive:true,
        plugins:{
            legend:{
                position:"top",
            },
            title:{
                display:true,
                text:"График дохода"
            },
        },
    };

    return <Bar data={charData} options={option}/>
};


export default BarChart