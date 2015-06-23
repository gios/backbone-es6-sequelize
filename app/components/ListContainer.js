import React from "react";
import AddItem from "./AddItem";
import List from "./List";
import todoStore from "../stores/todoStore";
import todoActions from "../actions/todoActions";

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: todoStore.getList()
    }
    this._onChange = this._onChange.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount() {
    todoStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    todoStore.removeChangeListener(this._onChange);
  }
  handleAddItem(newItem) {
    todoActions.addItem(newItem);
  }
  handleRemoveItem (index) {
    todoActions.removeItem(index);
  }
  _onChange() {
    this.setState({
      list: todoStore.getList()
    });
  }
  render() {

    let styles = {
      textCenter: {
        textAlign: "left"
      }
    };

    return (
      <div className="row">
        <div className="col-md-5"></div>
        <div className="col-md-1">
          <h3 style={styles.textCenter} className="iron" >
            Todo List
          </h3>
          <AddItem add={this.handleAddItem} style={styles.textCenter}/>
          <List items={this.state.list} remove={this.handleRemoveItem}/></div>
        <div className="col-md-6"></div>
      </div>
    )
  }
}

export default ListContainer;
