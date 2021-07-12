import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const EMPLOYEE_URL = `${CONST.API_URL}/Workshop/employee`;

const PRODUCTGROUP_URL = `${CONST.API_URL}/ProductGroup`;
//const EMPLOYEE_URL = `${CONST.API_URL}/Workshop/employee`
const PRODUCT_URL = `${CONST.API_URL}/Product`;
const FILEUPLOAD_URL = `${CONST.API_URL}/FileUpload`;

export const addEmployee = (payload) => {
  return axios.post(`${EMPLOYEE_URL}/add`, payload);
};

export const editEmployee = (payload, id) => {
  return axios.put(`${EMPLOYEE_URL}/${id}`, payload);
};

export const deleteEmployee = (id) => {
  return axios.delete(`${EMPLOYEE_URL}/${id}`);
};

export const getEmployee = (id) => {
  return axios.get(`${EMPLOYEE_URL}/${id}`);
};

export const getProductGroupFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  Name,
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    Name,
  };
  return axios.get(
    encodeURLWithParams(`${PRODUCTGROUP_URL}/getProductGroupFilter`, payload)
  );
};
export const getEmployeeFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  employeeCode,
  firstName,
  lastName
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    employeeCode,
    firstName,
    lastName,
  };
  return axios.get(encodeURLWithParams(`${EMPLOYEE_URL}/filter`, payload));
};

export const getProduct = (id) => {
  return axios.get(`${PRODUCT_URL}/getproduct/${id}`);
};

export const getProductFilter = (
  orderingField,
  ascendingOrder,
  page,
  recordsPerPage,
  name
) => {
  let payload = {
    page,
    recordsPerPage,
    orderingField,
    ascendingOrder,
    name,
  };
  return axios.get(encodeURLWithParams(`${PRODUCT_URL}/filter`, payload));
};

export const postFile = (file) => {
  let fd = new FormData();
  fd.append('file',file)
  return axios.post(`${FILEUPLOAD_URL}/UploadImage`,fd)
}
