'use strict';

(function () {
  var main = function () {
    window.backend.load(window.wizards.renderWizardFragment, window.dom.errorHandler);
    window.dom.addHandlers();
  };

  main();
})();

