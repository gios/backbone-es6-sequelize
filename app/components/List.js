var React = require('react'),
  mui = require("material-ui"),
  IconButton = mui.IconButton;

class List extends React.Component {
  render() {
    var styles = {
      uList: {
        paddingLeft: 0,
        listStyleType: "none"
      },
      todoItem: {
        paddingLeft: 10,
        fontSize: 15
      }
    };

    var listItems = this.props.items.map(function (item, index) {
      return (
        <li className="list-group-item" key={index}>
          <IconButton iconClassName="fa fa-times-circle" onClick={this.props.remove.bind(null, index)}/>
          <span style={styles.todoItem}>
            {item}
          </span>
        </li>
      )
    }.bind(this));
    return (
      <ul style={styles.uList}>
        {listItems}
      </ul>
    )
  }
}

export default List;
