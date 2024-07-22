import React from 'react';
import ChartComponent from './ChartComponent';

const TempChart: React.FC<{ planta: number }> = ({ planta }) => (
  <ChartComponent 
    planta={planta} 
    endpoint="infoplantas" 
    label="temperatura_agua" 
    color="rgba(255, 99, 132, 1)" 
    chartTitle="Temperatura del Agua a lo Largo del Tiempo" 
  />
);

export default TempChart;
