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
  height,
  width,
  className,
}) => {
  return (
    <div className={className}>
      <Chart
        type="bar"
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                autoSkip: true,
                maxRotation: 0,
                minRotation: 0,
              },
            },
          },
          ...options,
        }}
        height={height}
        width={width}
      />
    </div>
  );
};

export default ChartComponent;
