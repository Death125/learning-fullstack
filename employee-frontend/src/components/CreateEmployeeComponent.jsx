import React, { Component } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

export const withParams = (Component) => (props) => {
  let params = useParams();
  return <Component {...props} params={params} />;
};

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    // let { id } = props.params;
    this.state = {
      id: this.props.match.params.id,
      //   id: id,
      firstName: "",
      lastName: "",
      emailId: "",
      submitted: false,
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }

  componentDidMount() {
    if (this.state.id == -1) {
      return;
    } else {
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data;
        this.setState({
          firstName: employee.firstName,
          lastName: employee.lastName,
          emailId: employee.emailId,
        });
      });
    }
  }

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ emailId: event.target.value });
  };

  saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
    };
    console.log("employee => " + JSON.stringify(employee));

    if (this.state.id == -1) {
      EmployeeService.createEmployee(employee);
      this.setState({ submitted: true });
    } else {
      EmployeeService.updateEmployee(employee, this.state.id);
      this.setState({ submitted: true });
    }
  };

  getTitle() {
    if (this.state.id == -1) {
      return <h3 className="text-center">Add Employee</h3>;
    } else {
      return <h3 className="text-center">Update Employee</h3>;
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>First Name : </label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name : </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Id : </label>
                    <input
                      placeholder="Email Address"
                      name="emailId"
                      className="form-control"
                      value={this.state.emailId}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateEmployee}
                  >
                    Save
                  </button>

                  {this.state.submitted && (
                    <Navigate
                      to="/employees"
                      state={(this.state.submitted = true)}
                    />
                  )}

                  <Link
                    to="/employees"
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateEmployeeComponent);
