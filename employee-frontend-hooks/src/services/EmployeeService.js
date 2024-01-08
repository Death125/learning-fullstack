import axios from "axios";

const EMPLOYEE_API_GET_EMPLOYEE_URL =
  "http://localhost:8080/api/v1/employee/getAllEmployee";

const EMPLOYEE_API_CREATE_EMPLOYEE_URL =
  "http://localhost:8080/api/v1/employee/create";

const EMPLOYEE_API_GETBYID_EMPLOYEE_URL =
  "http://localhost:8080/api/v1/employee/getEmployeeById";

const EMPLOYEE_API_UPDATE_EMPLOYEE_URL =
  "http://localhost:8080/api/v1/employee/update";

const EMPLOYEE_API_DELETE_EMPLOYEE_URL =
  "http://localhost:8080/api/v1/employee/delete";

class EmployeeService {
  getEmployees() {
    return axios.get(EMPLOYEE_API_GET_EMPLOYEE_URL);
  }

  createEmployee(employee) {
    return axios.post(EMPLOYEE_API_CREATE_EMPLOYEE_URL, employee);
  }

  getEmployeeById(employeeId) {
    return axios.get(EMPLOYEE_API_GETBYID_EMPLOYEE_URL + "/" + employeeId);
  }

  updateEmployee(employeeId, employee) {
    return axios.put(
      EMPLOYEE_API_UPDATE_EMPLOYEE_URL + "/" + employeeId,
      employee
    );
  }

  deleteEmployee(employeeId) {
    return axios.delete(EMPLOYEE_API_DELETE_EMPLOYEE_URL + "/" + employeeId);
  }
}

export default new EmployeeService();
