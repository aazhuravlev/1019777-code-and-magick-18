'use strict';

(function () {
  var isLoading;
  var wizards = [];

  var getWizards = function () {
    return wizards;
  };

  var checkWizardColorCoat = function (wizard) {
    return wizard.colorCoat === window.dom.nodes.setupCoat.input.value ? 10 : 0;
  };

  var checkWizardColorEyes = function (wizard) {
    return wizard.colorEyes === window.dom.nodes.setupEyes.input.value ? 1 : 0;
  };

  var getRank = function (wizard) {
    return checkWizardColorCoat(wizard) + checkWizardColorEyes(wizard);
  };

  var comparator = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0 ? left.name.localeCompare(right.name) : rankDiff;
  };

  var updateWizards = function () {
    var wizardsClone = getWizards().slice();
    window.wizard.render(wizardsClone.sort(comparator));
  };

  var updateWizardsDebounced = window.util.debounce(updateWizards);

  var loadData = function () {
    if (wizards.length > 0 || isLoading) {
      return;
    }
    var onLoad = function (result) {
      wizards = result;
      updateWizards();
      return wizards;
    };
    isLoading = true;
    window.backend.load(onLoad, window.dom.errorHandler);
  };

  window.data = {
    getWizards: getWizards,
    loadData: loadData,
    updateWizards: updateWizards,
    updateWizardsDebounced: updateWizardsDebounced
  };
})();
