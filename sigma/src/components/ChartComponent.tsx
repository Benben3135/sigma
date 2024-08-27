import React from 'react';
import { Chart } from '@/components/Chart';
import { ChartDataInterface, ChartOptionsInterface } from '@/app/types';

interface ChartComponentProps {
  data: ChartDataInterface; // The data prop must match the ChartDataInterface
  options?: ChartOptionsInterface; // The options prop is optional and must match the ChartOptionsInterface
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, options }) => {
  return (
    <Chart
      type="bar" // Required: Specify the chart type (e.g., 'bar', 'line', etc.)
      data={data} // Required: Pass in the data for the chart
      options={options} // Optional: Pass in any options
      height={400} // Optional: Set the height of the chart
      width={600} // Optional: Set the width of the chart
    />
  );
};

export default ChartComponent;
