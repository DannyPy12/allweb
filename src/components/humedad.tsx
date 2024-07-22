import React from 'react';
import ChartComponent from './ChartComponent';

const HumidityChart: React.FC<{ planta: number }> = ({ planta }) => (
  <ChartComponent planta={planta} endpoint="infoplantas" label="Humedad" color="rgba(54, 162, 235, 1)" chartTitle="Humedad a lo Largo del Tiempo" />
);

export default HumidityChart;
