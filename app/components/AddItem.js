var React = require("react"),
  injectTapEventPlugin = require("react-tap-event-plugin"),
  mui = require("material-ui"),
  TextField = mui.TextField;
injectTapEventPlugin();

class AddItem extends React.Component {

  handleSubmit(e) {
    if (e.keyCode === 13) {
      var newItem = this.refs.newItem.getValue();
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
