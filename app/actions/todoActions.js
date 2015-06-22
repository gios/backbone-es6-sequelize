var AppDispatcher = require('../dispatcher/AppDispatcher'),
    appConstants = require('../constants/appConstants');

var todoActions = {
  addItem: function(item) {
    AppDispatcher.handleAction({
      actionType: appConstants.ADD_ITEM,
      data: item
    });
  },
  removeItem: function(index) {
    AppDispatcher.handleAction({
      actionType: appConstants.REMOVE_ITEM,
      data: index
    });
  }
};

export default todoActions;
