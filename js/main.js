'use strict';

(function () {
  var main = function () {
    window.backend.load(window.wizards.getFragmentHandler, window.backend.errorHandler);
    window.dom.addHandlers();
  };

  main();
})();

