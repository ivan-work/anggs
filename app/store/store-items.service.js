const DIClass = require('../core/DIClass');

module.exports = (ngApp) => {
  ngApp.service('StoreItemsService', StoreItemsService)
};

class Item {
  constructor(index) {
    this.id = index;
    this.imgUrl = `http://www.lorempixel.com/30/30/cats?${index}`;
    this.name = `Item ${String.fromCharCode(65 + index)}`;
    this.descShort = 'Very useful and good';
    this.suggestedPrice = 50 + Math.floor(Math.random() * 10 * index);
    this.percDisc = Math.floor(Math.random() * 5) * 10;
  }

  get actualPrice() {
    return this.suggestedPrice - (this.suggestedPrice * this.percDisc / 100);
  }
}


const data = Array(20).fill().map((u, i) => new Item(i));

class StoreItemsService extends DIClass {
  static $inject = ['$q'];

  init() {
    this.items = [];
  }

  loadItems() {
    // simulating request as a promise, for fun;
    return this.deps.$q.resolve(data)
  }

  getItems() {
    if (this.items.length === 0) {
      this.loadItems()
        .then(items => {
          this.items = items;
        });
    }
    return this.items;
  }

  getItem(id) {
    return this.getItems()[id];
  }

  buyItem(id) {
    // probably this belongs to another service, but I'll leave it there.

    const item = this.getItem(id);
    if (item.actualPrice > 100) {
      return this.deps.$q.resolve();
    } else {
      return this.deps.$q.reject();
    }
  }
}