import React from 'react';
import ChartComponent from './ChartComponent';

const PhChart: React.FC<{ planta: number }> = ({ planta }) => (
  <ChartComponent planta={planta} endpoint="infoplantas" label="pH" color="rgba(75, 192, 192, 1)" chartTitle="pH del Agua a lo Largo del Tiempo" />
);

export default PhChart;
