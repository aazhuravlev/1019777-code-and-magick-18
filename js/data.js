'use strict';

(function () {
  var isLoading;
  var wizards = [];

  var getWizards = function () {
    return wizards;
  };

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === window.dom.nodes.setupCoat.input.value) {
      rank += 2;
    }
    if (wizard.colorEyes === window.dom.nodes.setupEyes.input.value) {
      rank += 1;
    }
    return rank;
  };

  var namesСomparison = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var wizardsClone = window.data.getWizards().slice();
    window.wizard.render(wizardsClone.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesСomparison(left.name, right.name);
      }
      return rankDiff;
    }));
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
