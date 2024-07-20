import React from "react";
import ReactApexChart from "react-apexcharts";

const Revenue = () => {
  var revenueChart = {
    options: {
      series: [
        {
          name: "Net Profit",
          data: [20, 30, 20, 30, 20, 30, 20, 30],
          // radius: 12,
        },
      ],
      chart: {
        type: "area",
        height: 230,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      colors: ["var(--primary)"],
      dataLabels: {
        enabled: false,
      },
      markers: {
        shape: "circle",
      },
      legend: {
        show: false,
      },
      stroke: {
        show: true,
        width: 4,
        curve: "smooth",
        colors: ["var(--primary)"],
      },
      grid: {
        borderColor: "#eee",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        categories: [
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
        ],
        labels: {
          style: {
            colors: "#7E7F80",
            fontSize: "13px",
            fontFamily: "Poppins",
            fontWeight: 100,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        crosshairs: {
          show: false,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: -15,
          style: {
            colors: "#7E7F80",
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: 100,
          },
          formatter: function (y) {
            return y.toFixed(0) + "";
          },
        },
      },
      fill: {
        type: "solid",
        opacity: 1,
        colors: "var(--primary)",
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  };

  return (
    <>
      <div className="col-xl-6">
        <div className="card">
          <div className="card-header border-0 flex-wrap pb-0">
            <div className="mb-sm-0 mb-2">
              <h4 className="fs-20">
              Today’s Revenue
              </h4>
              <span>Graph data is based on full system manners</span>
            </div>
            <div>
              <h2 className="font-w700 mb-0">₹ 24,956</h2>
              <p className="mb-0 font-w700">
                <span className="text-success">0,5% </span>
                than last day
              </p>
            </div>
          </div>
          <div className="card-body py-0">
            <ReactApexChart
              options={revenueChart.options}
              series={revenueChart.options.series}
              type="area"
              height={227}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Revenue;
