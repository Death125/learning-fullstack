import React, { Component } from "react";

export default class FooterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
        <footer className="footer">
          <span className="text-light">All Rights Reserved 2023 @VKF</span>
        </footer>
      </div>
    );
  }
}
