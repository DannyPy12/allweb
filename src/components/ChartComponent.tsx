import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/Home.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartComponentProps {
  planta: number;
  endpoint: string;
  label: string;
  color: string;
  chartTitle: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ planta, endpoint, label, color, chartTitle }) => {
  const [data, setData] = useState<{ labels: string[], datasets: any[] }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://bdonly-water.onrender.com/${planta === 1 ? endpoint : endpoint + '2'}`;
        console.log('Fetching data from:', url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Data received:', result);

        const labels = result.map((item: any) => item.fecha);
        const data = result.map((item: any) => item[label.toLowerCase().replace(' ', '_')]);
        console.log('Parsed labels:', labels);
        console.log('Parsed data:', data);

        setData({
          labels,
          datasets: [
            {
              label: label,
              data: data,
              borderColor: color,
              backgroundColor: color.replace('1)', '0.2)'),
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [planta, endpoint, label, color]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'black'
        }
      },
      title: {
        display: true,
        text: chartTitle,
        color: 'black'
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black'
        }
      },
      y: {
        ticks: {
          color: 'black'
        }
      }
    }
  };

  return (
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
