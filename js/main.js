'use strict';

(function () {
  var main = function () {
    window.backend.load(window.wizards.getFragmentHandler, window.dom.errorHandler);
    window.dom.addHandlers();
  };

  main();
})();

