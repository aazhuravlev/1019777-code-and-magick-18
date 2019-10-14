'use strict';

(function () {
  var main = function () {
    window.backend.load(window.dom.getWizardFragmentHandler, window.dom.errorHandler);
    window.dom.nodes.openUserDialog.addEventListener('click', window.dom.openDialogClickHandler);
    window.dom.nodes.openUserDialog.addEventListener('keydown', window.dom.openDialogKeydownHandler);
    window.dom.nodes.setupClose.addEventListener('click', window.dom.closeDialogClickHandler);
    window.dom.nodes.setupClose.addEventListener('keydown', window.dom.closeDialogKeydownHandler);
    window.dom.nodes.setupUserName.addEventListener('keydown', window.dom.userNameKeydownHandler);
    window.dom.nodes.upload.addEventListener('mousedown', window.dom.dragHandler);
    window.dom.nodes.setupFireball.selector.addEventListener('click', window.dom.changeColorHandler(window.dom.nodes.setupFireball));
    window.dom.nodes.setupCoat.selector.addEventListener('click', window.dom.changeColorHandler(window.dom.nodes.setupCoat));
    window.dom.nodes.setupEyes.selector.addEventListener('click', window.dom.changeColorHandler(window.dom.nodes.setupEyes));
    window.dom.nodes.form.addEventListener('submit', window.dom.submitHandler);
  };

  main();
})();

