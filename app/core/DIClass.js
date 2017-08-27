// CLass that can handle angular DI;

module.exports = class DIClass {
  constructor(...deps) {
    this.deps = this.constructor.$inject.reduce((result, depname, i) => {
      result[depname] = deps[i];
      return result;
    }, {});
    this.init();
  }

  init() {
  }
};