module.exports = (ngApp) => {
  require('./store-items.service')(ngApp);
  require('./order.service')(ngApp);
  require('./list-items.directive')(ngApp);
  require('./buy-item.directive')(ngApp);
  require('./order-summary.directive')(ngApp);
};