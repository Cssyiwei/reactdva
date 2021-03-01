import React from "react";
import { connect } from "dva";

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>NotFound</h1>
      </div>
    );
  }
}
export default connect()(NotFound);
