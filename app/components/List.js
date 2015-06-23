import React from "react";
import mui from "material-ui";
var IconButton = mui.IconButton;

class List extends React.Component {
  render() {
    let styles = {
      uList: {
        paddingLeft: 0,
        listStyleType: "none"
      },
      todoItem: {
        paddingLeft: 10,
        fontSize: 15
      },
      listWrapper: {
        minWidth: "270px"
      }
    };

    let listItems = this.props.items.map(function (item, index) {
      return (
        <li key={index} style={styles.listWrapper}>
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
