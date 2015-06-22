var React = require('react');

class AddItem extends React.Component {
  handleSubmit(e) {
    if (e.keyCode === 13) {
      var newItem = this.refs.newItem.getDOMNode().value;
      this.refs.newItem.getDOMNode().value = '';
      this.props.add(newItem);
    }
  }

  render() {
    return (
      <div>
        <input className="form-control" onKeyDown={this.handleSubmit.bind(this)} placeholder="New Item" ref="newItem" type="text"/>
      </div>
    )
  }
}

export default AddItem;
