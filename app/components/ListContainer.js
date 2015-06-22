var React = require('react'),
  AddItem = require('./AddItem'),
  List = require('./List'),
  todoStore = require('../stores/todoStore'),
  todoActions = require('../actions/todoActions');

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
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center">
            Todo List
          </h3>
          <AddItem add={this.handleAddItem}/>
          <List items={this.state.list} remove={this.handleRemoveItem}/>
        </div>
      </div>
    )
  }
}

export default ListContainer;
