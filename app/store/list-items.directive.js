const DIClass = require('../core/DIClass');

module.exports = (ngApp) => {
  ngApp.directive('listItems', () => ({
    template: require('./list-items.directive.html')
    , replace: true
    , controller: StoreItemsDirective
    , controllerAs: 'ctrl'
  }))
};

class StoreItemsDirective extends DIClass {
  static $inject = ['StoreItemsService'];

  init() {
    this.filter = '';
  }

  getItems() {
    return this.deps.StoreItemsService.getItems();
  }

  sortBy(prop) {
    if (this.sortProp === prop) {
      if (!this.sortReverse) {
        this.sortReverse = true;
      } else {
        this.sortProp = void 0;
        this.sortReverse = void 0;
      }
    } else {
      this.sortProp = prop;
      this.sortReverse = false;
    }
  }

  filterByName = (item) => {
    if (this.filter.length === 0) return true;
    return item.name.toLowerCase().includes(this.filter.toLowerCase());
  }
}