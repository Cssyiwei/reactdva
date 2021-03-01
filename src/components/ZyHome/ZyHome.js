import React from "react";
import { connect } from "dva";
import Index from "../Index/Index";
class ZyHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>ZyHome</h1>
        <Index history={this.props.history} />
      </div>
    );
  }
}
export default connect()(ZyHome);