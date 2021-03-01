import React from "react";
import { connect } from "dva";
import Index from "../Index/Index";

class ZyCapital extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>ZyCapital</h1>
        <Index history={this.props.history}/>
      </div>
    );
  }
}
export default connect()(ZyCapital);
