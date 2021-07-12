import React from "react";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

function StandardDataTable(props) {
  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    filter: false,
    search: false,
    selectableRows: "none",
    serverSide: true,
    count: props.totalRecords,

    page: props.paginated.page - 1,
    rowsPerPage: props.paginated.recordsPerPage,
    rowsPerPageOptions: [5, 10, 15, 20, 30, 50],
    responsive: "vertical",
    rowHover: true,
    onChangeRowsPerPage: (numberOfRows) => {
      props.setPaginated({ ...props.paginated, recordsPerPage: numberOfRows });
    },
    onChangePage: (currentPage) => {
      props.setPaginated({ ...props.paginated, page: currentPage + 1 });
    },
    onColumnSortChange: (changedColumn, direction) => {
      props.setPaginated({
        ...props.paginated,
        orderingField: `${changedColumn}`,
        ascendingOrder: direction === "asc" ? true : false,
      });
    },
    textLabels: {
      body: {
        noMatch: "ไม่พบข้อมูล",
        toolTip: "Sort",
        columnHeaderTooltip: (column) => `จัดเรียงจาก ${column.label}`,
      },
      pagination: {
        next: "ถัดไป",
        previous: "ย้อนกลับ",
        rowsPerPage: "ข้อมูลต่อหน้า",
        displayRows: "จาก",
      },
      viewColumns: {
        title: "แสดง Columns",
        titleAria: "Show/Hide Table Columns",
      },
    },
  };

  return (
    <div>
      {/* Datatable */}
      <MUIDataTable
        title={
          <Typography
            variant="h6"
          >
            {props.title}
          </Typography>
        }
        data={props.data}
        columns={props.columns}
        options={options}
      />
    </div>
  );
}

StandardDataTable.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  paginated: PropTypes.object,
  setPaginated: PropTypes.func,
  data: PropTypes.array,
  columns: PropTypes.array,
  totalRecords: PropTypes.number
};

// Same approach for defaultProps too
StandardDataTable.defaultProps = {
  name: "please set name",
  title: "please set title",
  paginated: {
    page: 1,
    recordsPerPage: 10,
    orderingField: "",
    ascendingOrder: true,
  },
  setPaginated: () => {},
  data: [],
  columns: [],
  totalRecords: 0
};

export default StandardDataTable;
