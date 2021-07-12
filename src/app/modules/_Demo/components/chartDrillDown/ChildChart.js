/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-imports */
import React from "react";
import Paper from "@material-ui/core/Paper";
import Chart from "react-apexcharts";
import { chartData } from "./chartData";

export default function ChildChart(props) {
 const [pieOption, setPieOption] = React.useState({
    series: [0, 0, 0, 0],
    labels: ["Agent A", "Agent B", "Agent C", "Agent D"],
  });

  const plotOptions = {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
          },
        },
      },
    },
  };

  React.useEffect(() => {
    //prepare labels and series
    let labels = []; 
    let series = [];
    chartData.forEach(function(obj) {
          if (obj.branch === props.selectedParentDetail.seriesName && obj.month === props.selectedParentDetail.dataPointName) {
            labels.push(obj.employee);
            series.push(obj.total)
          }
        });
    setPieOption({series,labels,plotOptions})

  }, [props.selectedParentDetail])

  return (
    <Paper elevation={3}>
      {props.selectedParentDetail.seriesName} , {props.selectedParentDetail.dataPointName}
      <Chart options={pieOption} series={pieOption.series} type="donut"  width="100%" />
      {/* selected:{JSON.stringify(props.selectedParentDetail,2,null)}
      <br></br>
      pieOption:{JSON.stringify(pieOption,2,null)} */}
    </Paper>
  );
}
