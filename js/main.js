'use strict';

(function () {
  var main = function () {
    window.backend.load(window.wizards.getWizardFragment, window.dom.errorHandler);
    window.dom.addHandlers();
  };

  main();
})();

