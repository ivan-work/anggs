const DIClass = require('../core/DIClass');

module.exports = (ngApp) => {
  ngApp.service('OrderService', OrderService)
};

let orderId = 0;

class OrderService extends DIClass {
  static $inject = ['$q', 'StoreItemsService'];

  init() {
    this.orders = [];
  }

  buyItem(itemId) {
    const item = this.deps.StoreItemsService.getItem(itemId);
    if (item.actualPrice <= 100) {
      const order = {
        id: orderId++
        , itemId: itemId
      };
      this.orders.push(order);
      return this.deps.$q.resolve(order);
    } else {
      return this.deps.$q.reject({message: 'Sorry, test credit card is limited to $100 purchases'});
    }
  }

  getOrders() {
    return this.orders;
  }

  getOrder(id) {
    return this.getOrders()[id];
  }
}