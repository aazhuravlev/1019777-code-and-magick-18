'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  window.getWizards = function (quantity) {
    var wizards = [];
    var wizardNames = WIZARD_NAMES.slice(0);
    var wizardSurnames = WIZARD_SURNAMES.slice(0);
    var coatColors = COAT_COLORS.slice(0);
    var eyesColors = EYES_COLORS.slice(0);
    for (var i = 0; i < quantity; i++) {
      wizards.push({
        name: window.spliceRandomItem(wizardNames) + ' ' + window.spliceRandomItem(wizardSurnames),
        coatColor: window.spliceRandomItem(coatColors),
        eyesColor: window.spliceRandomItem(eyesColors)
      });
    }
    return wizards;
  };
})();
