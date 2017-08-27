const DIClass = require('../core/DIClass');

module.exports = (ngApp) => {
  ngApp.directive('buyItem', () => ({
    template: require('./buy-item.directive.html')
    , replace: true
    , controller: BuyItemDirective
    , controllerAs: 'ctrl'
  }))
};

class BuyItemDirective extends DIClass {
  static $inject = ['$scope', '$state', '$stateParams', 'OrderService', 'StoreItemsService'];

  init() {
  }

  fillTestData() {
    this.form = {
      name: 'test'
      , address: 'test'
      , email: 'q@q.q'
      , phone: '123-456-7890'
      , ccard: '1234567812345678123'
    };
    this.deps.$scope.billingForm.$setDirty();
  }

  getItemId() {
    return this.deps.$stateParams.id;
  }

  getItem() {
    return this.deps.StoreItemsService.getItem(this.getItemId());
  }

  buyItem($event) {
    $event.preventDefault(); // to fix Form submission canceled because the form is not connected

    this.deps.OrderService
      .buyItem(this.getItemId())
      .then((order) => {
        this.deps.$state.go('order', {id: order.id});
      })
      .catch((e) => {
        alert(e.message);
      })
  }
}