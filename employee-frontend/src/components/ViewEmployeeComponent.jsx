import React, { Component } from "react";
import { useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
export const withParams = (Component) => (props) => {
  let params = useParams();
  return <Component {...props} params={params} />;
};

class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    let { id } = props.params;
    this.state = {
      id: id,
      employee: {},
    };
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      this.setState({ employee: res.data });
    });
  }

  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">View Employee Details</h3>
          <div className="card-body">
            <div className="row">
              <label>Employee First Name: </label>
              <div>{this.state.employee.firstName}</div>
            </div>
            <div className="row">
              <label>Employee Last Name: </label>
              <div>{this.state.employee.lastName}</div>
            </div>
            <div className="row">
              <label>Employee Email ID: </label>
              <div>{this.state.employee.emailId}</div>
            </div>
            <div className="row">
              <label>Employee Date Created: </label>
              <div>{this.state.employee.dateCreated}</div>
            </div>
            <div className="row">
              <label>Employee Date Updated: </label>
              <div>{this.state.employee.dateUpdated}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(ViewEmployeeComponent);
