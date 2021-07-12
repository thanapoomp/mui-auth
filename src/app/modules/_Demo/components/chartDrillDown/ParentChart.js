/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React from "react";
import Paper from "@material-ui/core/Paper";
import Chart from "react-apexcharts";
import { chartData } from "./chartData";

export default function ParentChart(props) {
  const [chartSeries, setchartSeries] = React.useState([]);
  const [chartOption, setchartOption] = React.useState({});
  const [selectedIndex, setSelectedIndex] = React.useState({
    dataPointIndex: -1,
    seriesIndex: -1,
  });
  const [selectedDetail, setSelectedDetail] = React.useState({
    dataPointName: "",
    seriesName: "",
  });

  let handleClick = (config) => {
    // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
    if (config.dataPointIndex !== -1) {
      let dataPointIndex = config.dataPointIndex;
      let seriesIndex = config.seriesIndex;
      setSelectedIndex({ dataPointIndex, seriesIndex });
    }
  };

  const prepareChartSeries = () => {
    let tempData = [];

    // แปลงข้อมูล
    let tempHelper = {};
    tempData = chartData.reduce(function(r, o) {
      var key = o.branch + "-" + o.month;

      if (!tempHelper[key]) {
        tempHelper[key] = { branch: o.branch, month: o.month, total: o.total }; // create a copy of o
        r.push(tempHelper[key]);
      } else {
        tempHelper[key].total += o.total;
      }
      return r;
    }, []);

    // console.log(tempData);

    //จัดข้อมูลให้อยู่ในรูปแบบที่ chart ต้องการ
    let result = [];
    let resultHelper = {};
    result = tempData.reduce(function(r, o) {
      var key = o.branch;
      resultHelper.branch = o.branch;

      //get data
      if (!resultHelper[key]) {
        let data = []; //todo: get data
        tempData.forEach(function(obj) {
          if (obj.branch === o.branch) {
            data.push(obj.total);
          }
        });
        // console.log(data)
        resultHelper[key] = { name: o.branch, data: data }; //
        r.push(resultHelper[key]);
      }
      return r;
    }, []);

    // console.log(result);
    return result;
  };

  const prepareXaxis = () => {
    const uniqueMonth = [...new Set(chartData.map((item) => item.month))];
    let xaxis = { categories: uniqueMonth };
    return xaxis;
  };

  React.useEffect(() => {
    //prepare xaxis
    let xaxis = prepareXaxis();

    //prepare chart series
    let series = prepareChartSeries();

    setchartOption({
      chart: {
        id: "basic-bar",
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: true,
            customIcons: [],
          },
          autoSelected: "zoom",
        },
        events: {
          click: (event, chartContext, config) => handleClick(config),
        },
      },
      xaxis: xaxis,
    });

    setchartSeries(series);
  }, []);

  React.useEffect(() => {
    if (selectedIndex.dataPointIndex !== -1) {
      let dataPointName =
        chartOption.xaxis.categories[selectedIndex.dataPointIndex];
      let seriesName = chartSeries[selectedIndex.seriesIndex].name;
      setSelectedDetail({
        dataPointName,
        seriesName,
      });
    }

  }, [selectedIndex]);

  React.useEffect(() => {
    props.selectedChanged({
      dataPintIndex: selectedIndex.dataPointIndex,
      dataPointName: selectedDetail.dataPointName,
      seriesIndex: selectedIndex.seriesIndex,
      seriesName: selectedDetail.seriesName
    })
  }, [selectedDetail])

  return (
    <Paper elevation={3}>
      BAR
      <Chart
        options={chartOption}
        series={chartSeries}
        type="bar"
        width="100%"
      />
      selectedIndex: {JSON.stringify(selectedIndex, 2, null)},<br></br>
      selectedDetail: {JSON.stringify(selectedDetail, 2, null)}
      <br></br>
      series: {JSON.stringify(chartSeries, 2, null)}
      <br></br>
      options: {JSON.stringify(chartOption.xaxis, 2, null)}
    </Paper>
  );
}
