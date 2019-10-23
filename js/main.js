'use strict';

(function () {
  var main = function () {
    window.data.loadData(window.data.updateWizards, window.dom.errorHandler);
    window.dom.addHandlers();
  };

  main();
})();

