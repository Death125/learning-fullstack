import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import { Link, useParams } from "react-router-dom";

export default class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    };
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  // Called immediately after a component is mounted
  // jika ingin menggunakan ajax bisa menggunakan ini
  componentDidMount() {
    EmployeeService.getEmployees().then((result) => {
      this.setState({ employees: result.data });
    });
  }

  editEmployee(id) {
    window.location.href = `/addEmployee/${id}`;
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then((res) => {
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== id
        ),
      });
    });
    window.location.href = `/employees`;
  }

  viewEmployee(id) {
    window.location.href = `/view-employee/${id}`;
  }

  render() {
    return (
      <div>
        <h2 className="test-center">Employee List</h2>
        <div className="row">
          <Link to="/addEmployee/-1">
            <button className="btn btn-primary">Add Employee</button>
          </Link>
        </div>
        <div className="row">
          <table className="table table-striped table-borderd">
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Employee Date Created</th>
                <th>Employee Date Updated</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.emailId}</td>
                  <td>{employee.dateCreated}</td>
                  <td>{employee.dateUpdated}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => this.editEmployee(employee.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteEmployee(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.viewEmployee(employee.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
