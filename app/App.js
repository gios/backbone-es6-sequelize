var React = require('react'),
  ThemeManager = require('material-ui/lib/styles/theme-manager')(),
  ListContainer = require('./components/ListContainer');

var App = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function () {
    return (
      <div>
        <ListContainer />
      </div>
    )
  }
});
React.render(<App />, document.getElementById('app'));
