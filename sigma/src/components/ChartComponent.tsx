import React from "react";
import { Chart } from "@/components/Chart";
import { ChartDataInterface, ChartOptionsInterface } from "@/app/types";

interface ChartComponentProps {
  data: ChartDataInterface; // The data prop must match the ChartDataInterface
  options?: ChartOptionsInterface; // The options prop is optional and must match the ChartOptionsInterface
  height?: number; // The height prop is optional and must be a number
  width?: number; // The width prop is optional and must be a number
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  options,
  height = 400, // Provide default height if not passed
  width = 600,  // Provide default width if not passed
}) => {
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <Chart
        type="bar" // Required: Specify the chart type (e.g., 'bar', 'line', etc.)
        data={data} // Required: Pass in the data for the chart
        options={options} // Optional: Pass in any options
      />
    </div>
  );
};

export default ChartComponent;
