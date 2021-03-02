import React from "react";
import { connect } from "dva";
import TabBar from "../TabBar/TabBar";

class ZyMine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>ZyMine</h1>
        <TabBar history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}
export default connect()(ZyMine);
