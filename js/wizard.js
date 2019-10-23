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

  var renderWizards = function (arr) {
    window.dom.nodes.setupSimilarList.innerHTML = '';
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      window.dom.nodes.setupSimilarList.appendChild(renderWizard(arr[i]));
    }
  };

  window.wizard = {
    render: renderWizards
  };
})();
