import angular from 'angular';
import '@uirouter/angularjs';

const ngApp = angular.module('AngGS', ['ui.router']).config(
  ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
      name: 'store'
      , url: '/store'
      , template: '<list-items/>'
    });
    $stateProvider.state({
      name: 'buy'
      , url: '/buy/:id'
      , template: `<div>
<a ui-sref="store">back</a>
<buy-item/>
</div>`
    });
    $stateProvider.state({
      name: 'order'
      , url: '/order/:id'
      , template: `<div>
<a ui-sref="store">go to store</a>
<order-summary/>
</div>`
    });
    $urlRouterProvider.otherwise('/store');
  }]);

require('./store/store.config')(ngApp);