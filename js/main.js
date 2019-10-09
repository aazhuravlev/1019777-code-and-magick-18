'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;

  var main = function () {
    window.NODES.setupSimilarList.appendChild(window.getFragment(window.getWizards(WIZARDS_QUANTITY)));
    window.NODES.openUserDialog.addEventListener('click', window.openDialogClickHandler);
    window.NODES.openUserDialog.addEventListener('keydown', window.openDialogKeydownHandler);
    window.NODES.setupClose.addEventListener('click', window.closeDialogClickHandler);
    window.NODES.setupClose.addEventListener('keydown', window.closeDialogKeydownHandler);
    window.NODES.setupUserName.addEventListener('keydown', window.userNameKeydownHandler);
    window.NODES.upload.addEventListener('mousedown', window.dragHandler);
    window.NODES.setupFireball.selector.addEventListener('click', window.changeColorHandler(window.NODES.setupFireball));
    window.NODES.setupCoat.selector.addEventListener('click', window.changeColorHandler(window.NODES.setupCoat));
    window.NODES.setupEyes.selector.addEventListener('click', window.changeColorHandler(window.NODES.setupEyes));
  };

  main();
})();

