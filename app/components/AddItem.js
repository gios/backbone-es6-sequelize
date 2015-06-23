import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui from "material-ui";
var TextField = mui.TextField;
injectTapEventPlugin();

class AddItem extends React.Component {

  handleSubmit(e) {
    if (e.keyCode === 13) {
      let newItem = this.refs.newItem.getValue();
      this.refs.newItem.clearValue();
      this.props.add(newItem);
    }
  }

  render() {
    return (
      <div>
        <TextField floatingLabelText="Enter" hintText="New Item" onKeyDown={this.handleSubmit.bind(this)} ref="newItem" maxLength="20"/>
      </div>
    )
  }
}

export default AddItem;
