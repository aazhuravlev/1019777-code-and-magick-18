'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;

  var renderWizard = function (wizard) {
    var wizardElement = window.dom.nodes.setupSimilarItem.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var getWizardFragmentHandler = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }
    window.dom.nodes.setupSimilarList.appendChild(fragment);
  };

  window.wizards = {
    getFragmentHandler: getWizardFragmentHandler
  };
})();
