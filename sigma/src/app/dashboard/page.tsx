"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ChartComponent from "@/components/ChartComponent";
import { ChartDataInterface, ChartOptionsInterface } from "@/app/types";

export enum ProgressView {
  Week = "week",
  Month = "month",
  Year = "year",
}

export default function Page() {
  const [progressView, setProgressView] = useState<ProgressView>(
    ProgressView.Week
  );

  const options: ChartOptionsInterface = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const { data: weekData, error: weekDataError, isLoading: weekDataLoading } = useQuery({
    queryKey: ["week"],
    queryFn: () => axios.get("http://localhost:3001/data/week").then((res) => res.data),
    enabled: progressView === ProgressView.Week,
  });

  const { data: monthData, error: monthDataError, isLoading: monthDataLoading } = useQuery({
    queryKey: ["month"],
    queryFn: () => axios.get("http://localhost:3001/data/month").then((res) => res.data),
    enabled: progressView === ProgressView.Month,
  });

  const { data: yearData, error: yearDataError, isLoading: yearDataLoading } = useQuery({
    queryKey: ["year"],
    queryFn: () => axios.get("http://localhost:3001/data/year").then((res) => res.data),
    enabled: progressView === ProgressView.Year,
  });

  // Determine the data to pass based on the selected view
  const getData = () => {
    switch (progressView) {
      case ProgressView.Week:
        return weekData;
      case ProgressView.Month:
        return monthData;
      case ProgressView.Year:
        return yearData;
      default:
        return undefined;
    }
  };

  const data = getData();

  return (
    <div className="w-full h-fit p-6">
      <div className="w-full h-full flex flex-col items-start justify-start gap-6">
        <div className="w-full h-fit flex xl:flex-row flex-col gap-4">
          <div className="2xl:flex-[2] w-full border-red-500 border h-fit">
            <div className="w-full h-full p-3 flex flex-col gap-3 justify-start items-start">
              <div className="flex flex-row justify-start items-start gap-4">
                <h1 className="text-white-100 text-2xl font-bold antialiased">
                  Your {progressView} progress
                </h1>
                <div className="w-fit h-fit flex flex-row justify-center items-center">
                  <div className="w-fit h-fit">
                    <button
                      onClick={() => setProgressView(ProgressView.Week)}
                      className={
                        progressView === ProgressView.Week
                          ? "w-fit h-fit p-2 border border-violet-400 bg-violet-400"
                          : "w-fit text-violet-400 h-fit p-2 border border-white-100"
                      }
                    >
                      Week
                    </button>
                  </div>
                  <div className="w-fit h-fit">
                    <button
                      onClick={() => setProgressView(ProgressView.Month)}
                      className={
                        progressView === ProgressView.Month
                          ? "w-fit h-fit p-2 border border-violet-400 bg-violet-400"
                          : "w-fit text-violet-400 h-fit p-2 border border-white-100"
                      }
                    >
                      Month
                    </button>
                  </div>
                  <div className="w-fit h-fit">
                    <button
                      onClick={() => setProgressView(ProgressView.Year)}
                      className={
                        progressView === ProgressView.Year
                          ? "w-fit h-fit p-2 border border-violet-400 bg-violet-400"
                          : "w-fit text-violet-400 h-fit p-2 border border-white-100"
                      }
                    >
                      Year
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full p-8 flex-1 border-violet-950 border">
                {data ? (
                  <ChartComponent data={data} options={options} />
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
          <div className="2xl:flex-1 w-full border-green-600 border h-[15rem]"></div>
        </div>
      </div>
    </div>
  );
}


// const data: ChartDataInterface = {
//   labels: ["January", "February", "March", "April", "May"],
//   datasets: [
//     {
//       label: "Sales",
//       data: [300, 400, 200, 500, 700],
//       backgroundColor: "rgba(75,192,192,0.4)",
//       borderColor: "rgba(75,192,192,1)",
//       borderWidth: 1,
//     },
//   ],
// };