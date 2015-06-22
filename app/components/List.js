var React = require('react');

class List extends React.Component {
  render() {
    var styles = {
      uList: {
        paddingLeft: 0,
        listStyleType: "none"
      },
      listGroup: {
        margin: '5px 0',
        borderRadius: 5
      },
      removeItem: {
        fontSize: 20,
        float: "left",
        position: "absolute",
        top: 12,
        left: 6,
        cursor: "pointer",
        color: "rgb(222, 79, 79)"
      },
      todoItem: {
        paddingLeft: 20,
        fontSize: 17
      }
    };

    var listItems = this.props.items.map(function (item, index) {
      return (
        <li className="list-group-item" key={index} style={styles.listGroup}>
          <span className="glyphicon glyphicon-remove" onClick={this.props.remove.bind(null, index)} style={styles.removeItem}></span>
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
