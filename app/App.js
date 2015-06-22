var React = require('react'),
  ListContainer = require('./components/ListContainer');

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <ListContainer />
        </div>
      </div>
    )
  }
}
React.render(<App />, document.getElementById('app'));
