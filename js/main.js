'use strict';

(function () {
  var main = function () {
    window.backend.load(window.wizards.render, window.dom.errorHandler);
    window.dom.addHandlers();
  };

  main();
})();

