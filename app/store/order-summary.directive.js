const DIClass = require('../core/DIClass');

module.exports = (ngApp) => {
  ngApp.directive('orderSummary', () => ({
    template: require('./order-summary.directive.html')
    , replace: true
    , controller: OrderSummaryDirective
    , controllerAs: 'ctrl'
  }))
};

class OrderSummaryDirective extends DIClass {
  static $inject = ['$state', '$stateParams', 'StoreItemsService', 'OrderService'];

  init() {
  }

  getOrderId() {
    return this.deps.$stateParams.id;
  }

  getOrder() {
    const order = this.deps.OrderService.getOrder(this.getOrderId());
    return order;
  }

  getItem() {
    const order = this.getOrder();
    if (!order) {
      // protection from livereload errors
      this.deps.$state.go('store');
    } else {
      return this.deps.StoreItemsService.getItem(order.itemId);
    }
  }
}