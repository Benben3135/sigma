import React from "react";
import { Chart } from "@/components/Chart";
import { ChartDataInterface, ChartOptionsInterface } from "@/app/types";

interface ChartComponentProps {
  data: ChartDataInterface;
  options?: ChartOptionsInterface;
  height?: number;
  width?: number;
  className?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  options,
  height,  // We remove the default values here for better flexibility with className
  width,   // We remove the default values here for better flexibility with className
  className,
}) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: width ? `${width}px` : "100%", height: height ? `${height}px` : "100%" }}
    >
      <Chart
        type="bar"
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          ...options, // Spread the additional options
        }}
      />
    </div>
  );
};

export default ChartComponent;
